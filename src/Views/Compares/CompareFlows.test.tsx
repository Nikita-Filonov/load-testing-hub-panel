import { expect, it, vi } from 'vitest';
import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { renderRoute, setupRouteTests } from '../../test/fixtures/routes';

setupRouteTests();

it('compares a result with a selected run and loads its comparison charts', async () => {
  const store = renderRoute('/services/3/results/64/compare-result-with-results');
  await screen.findByText('There are no results to compare here', {}, { timeout: 12000 });
  await waitFor(() => expect(store.getState().loadTestResults.loadTestResultDetails.id).toBe(64));
  fireEvent.click(screen.getAllByTestId('FormatListBulletedIcon').at(-1)!.closest('button')!);
  const dialog = await screen.findByRole('dialog', { name: 'Select load test results' });
  const previous = (await within(dialog).findByText(/#62 Load tests for/)).closest('li')!;
  const selected = within(previous).getByRole('checkbox') as HTMLInputElement;
  if (!selected.checked) fireEvent.click(previous.querySelector('button')!);

  await waitFor(() => expect(store.getState().compareResultWithResults.compareResultWithResults).toHaveLength(1));
  expect(vi.mocked(fetch).mock.calls.some(([url]) =>
    new URL(url as string).pathname === '/api/v1/compares/compare-result-with-results')).toBe(true);
  expect(await screen.findByText('Comparison charts')).toBeInTheDocument();
});

it.each([
  ['/services/3/dashboard', '/compares/compare-averages-with-scenario', /Compare average values with scenario Baseline/],
  ['/services/3/methods/details?method=GET%20%2Fcart&protocol=http',
    '/compares/compare-method-with-scenario', /Compare GET \/cart method with scenario Baseline/]
])('selects a scenario and loads its comparison on %s', async (path, endpoint, label) => {
  const store = renderRoute(path);
  fireEvent.click(await screen.findByText('Scenario not selected', {}, { timeout: 12000 }));
  const option = await screen.findByText('#5 Baseline - stable load');
  fireEvent.click(option);
  await waitFor(() => expect(store.getState().scenarios.scenario.id).toBe(5));
  expect(await screen.findByText(label)).toBeInTheDocument();
  await waitFor(() => expect(vi.mocked(fetch).mock.calls.some(([url]) =>
    new URL(url as string).pathname === `/api/v1${endpoint}`)).toBe(true));
});

it.each([
  ['Show comparison with results', 'Comparison with results'],
  ['Show comparison with averages', 'Comparison with averages'],
  ['Show comparison with scenario', 'Comparison with scenario']
])('navigates from a result to %s', async (action, title) => {
  renderRoute('/services/3/results/64');
  await screen.findByText('Load tests result details', {}, { timeout: 12000 });
  fireEvent.click(screen.getByTestId('CompareArrowsIcon').closest('button')!);
  fireEvent.click(screen.getByRole('menuitem', { name: action }));
  expect(await screen.findByText(title, {}, { timeout: 12000 })).toBeInTheDocument();
});
