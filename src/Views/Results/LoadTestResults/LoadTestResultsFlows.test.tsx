import { expect, it, vi } from 'vitest';
import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { renderRoute, setupRouteTests } from '../../../test/fixtures/routes';
import { mockDemoApi } from '../../../test/fixtures/api';
import apiResponses from '../../../test/fixtures/apiResponses.json';

setupRouteTests();

it('adds a result comment and deletes the result through its menu', async () => {
  const details = { ...apiResponses['/load-test-results/details/64'].details, comment: 'Reviewed regression run' };
  const fetchMock = mockDemoApi({
    'PATCH /load-test-results/64': { details },
    'DELETE /load-test-results/64': {}
  });
  const store = renderRoute('/services/3/results');
  const resultTitle = await screen.findByText(/#64 Load tests for/, {}, { timeout: 12000 });
  const resultCard = resultTitle.closest('.MuiPaper-root')!;
  fireEvent.click(within(resultCard as HTMLElement).getByTestId('MoreVertIcon').closest('button')!);
  fireEvent.click(screen.getByRole('menuitem', { name: 'Set comment' }));
  const commentDialog = await screen.findByRole('dialog', { name: 'Set load test result comment' });
  await waitFor(() => expect(within(commentDialog).getByRole('textbox', { name: 'Comment' })).toBeInTheDocument());
  fireEvent.change(within(commentDialog).getByRole('textbox', { name: 'Comment' }), {
    target: { value: 'Reviewed regression run' }
  });
  fireEvent.click(within(commentDialog).getByRole('button', { name: 'Confirm' }));
  await waitFor(() => expect(store.getState().loadTestResults.loadTestResults.find(({ id }) => id === 64)?.comment)
    .toBe('Reviewed regression run'));
  const patch = fetchMock.mock.calls.find(([url, options]) =>
    new URL(url).pathname.endsWith('/load-test-results/64') && options?.method === 'PATCH');
  expect(JSON.parse(patch![1]!.body as string).comment).toBe('Reviewed regression run');

  fireEvent.click(within(screen.getByText(/#64 Load tests for/).closest('.MuiPaper-root') as HTMLElement)
    .getByTestId('MoreVertIcon').closest('button')!);
  fireEvent.click(screen.getByRole('menuitem', { name: 'Delete' }));
  const deleteDialog = await screen.findByRole('dialog', { name: 'Delete load tests result?' });
  fireEvent.click(within(deleteDialog).getByRole('button', { name: 'Confirm' }));
  await waitFor(() => expect(store.getState().loadTestResults.loadTestResults.some(({ id }) => id === 64)).toBe(false));
});

it('sorts method statistics and opens details with time series history', async () => {
  const store = renderRoute('/services/3/results/64');
  const statistics = await screen.findByText('Statistics of methods', {}, { timeout: 12000 });
  const widget = statistics.closest('.MuiPaper-root') as HTMLElement;
  const search = within(widget).getByPlaceholderText('Search by method name');
  fireEvent.change(search, { target: { value: 'cart' } });
  expect(within(widget).getByText('GET /cart')).toBeInTheDocument();
  expect(within(widget).queryByText('GET /shipping/rates')).not.toBeInTheDocument();
  fireEvent.change(search, { target: { value: '' } });
  fireEvent.click(within(widget).getByText('Number of requests'));
  const row = within(widget).getByText('GET /cart').closest('tr')!;
  fireEvent.click(within(row).getByTestId('AnalyticsOutlinedIcon').closest('button')!);
  const detailsDialog = await screen.findByRole('dialog', { name: 'Method result details' });
  await waitFor(() => expect(store.getState().methodResults.methodResultDetails.id).toBe(358));
  await waitFor(() => expect(store.getState().methodResultsHistory.methodResultsHistory.length).toBeGreaterThan(0));
  expect(within(detailsDialog).getByText(/Values for GET \/cart method/)).toBeInTheDocument();
  fireEvent.click(within(detailsDialog).getByRole('button', { name: 'Cancel' }));
  await waitFor(() => expect(store.getState().methodResults.methodResultDetails.id).toBe(0));
});

it('opens available CI links and disables missing links for older results', async () => {
  const open = vi.spyOn(window, 'open').mockImplementation(() => null);
  renderRoute('/services/3/results');
  const current = await screen.findByText(/#64 Load tests for/, {}, { timeout: 12000 });
  const currentCard = current.closest('.MuiPaper-root') as HTMLElement;
  const openCurrentMenu = () => fireEvent.click(within(currentCard).getByTestId('MoreVertIcon').closest('button')!);
  for (const [action, url] of [
    ['Open trigger job', 'https://ci.example.test/checkout/jobs/1059'],
    ['Open load tests job', 'https://ci.example.test/checkout/jobs/2059'],
    ['Open trigger pipeline', 'https://ci.example.test/checkout/pipelines/559'],
    ['Open load tests pipeline', 'https://ci.example.test/checkout/pipelines/559']
  ]) {
    openCurrentMenu();
    fireEvent.click(screen.getByRole('menuitem', { name: action }));
    expect(open).toHaveBeenLastCalledWith(url, '_blank');
  }
  const previous = screen.getByText(/#61 Load tests for/);
  fireEvent.click(within(previous.closest('.MuiPaper-root') as HTMLElement).getByTestId('MoreVertIcon').closest('button')!);
  expect(screen.getByRole('menuitem', { name: 'Open trigger job' })).toHaveAttribute('aria-disabled', 'true');
  expect(screen.getByRole('menuitem', { name: 'Open trigger pipeline' })).toHaveAttribute('aria-disabled', 'true');
  open.mockRestore();
});

it('filters exceptions and opens the original error details', async () => {
  const exception = apiResponses['/exception-results'].results[0];
  mockDemoApi({ 'GET /exception-results/details/137': {
    details: { ...exception, details: 'payments client: deadline of 2 seconds exceeded' }
  } });
  const store = renderRoute('/services/3/results/64');
  await screen.findByText(exception.message, {}, { timeout: 12000 });
  fireEvent.change(screen.getByPlaceholderText('Search by message'), { target: { value: 'timeout' } });
  expect(screen.queryByText('ServiceUnavailable: upstream overloaded')).not.toBeInTheDocument();
  const row = screen.getByText(exception.message).closest('tr')!;
  fireEvent.click(within(row).getByTestId('ArticleOutlinedIcon').closest('button')!);
  await screen.findByRole('dialog', { name: 'Exception result details' });
  expect(await screen.findByText('payments client: deadline of 2 seconds exceeded')).toBeInTheDocument();
  expect(store.getState().exceptionResults.exceptionResultDetails.id).toBe(137);
});

it('opens a monitoring integration and the previous result from the result toolbar', async () => {
  const open = vi.spyOn(window, 'open').mockImplementation(() => null);
  const fetchMock = mockDemoApi({
    'POST /integrations/build-integration-url': { integrationUrl: 'https://grafana.example.test/d/load-test-64' }
  });
  const store = renderRoute('/services/3/results/64');
  await waitFor(() => expect(store.getState().loadTestResults.loadTestResultDetails.id).toBe(64));
  const integrationButton = screen.getAllByTestId('HubOutlinedIcon')
    .map((icon) => icon.closest('button')).find((button) => button !== null)!;
  await waitFor(() => expect(integrationButton).not.toBeDisabled());
  fireEvent.click(integrationButton);
  fireEvent.click(screen.getByRole('menuitem', { name: /Demo Grafana/ }));
  await waitFor(() => expect(open).toHaveBeenCalledWith('https://grafana.example.test/d/load-test-64', '_blank'));
  const request = fetchMock.mock.calls.find(([url]) => new URL(url).pathname.endsWith('build-integration-url'))!;
  expect(JSON.parse(request[1]!.body as string)).toMatchObject({ integrationId: 3, loadTestResultId: 64 });

  fireEvent.click(screen.getByTestId('AddLinkIcon').closest('button')!);
  fireEvent.click(screen.getByRole('menuitem', { name: 'View previous result' }));
  const previousId = apiResponses['/load-test-results/details/64'].details.compare.previousId;
  expect(open).toHaveBeenLastCalledWith(expect.stringContaining(`/services/3/results/${previousId}`), '_blank');
  open.mockRestore();
});
