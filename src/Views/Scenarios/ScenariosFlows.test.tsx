import { expect, it, vi } from 'vitest';
import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { renderRoute, setupRouteTests } from '../../test/fixtures/routes';
import { mockDemoApi } from '../../test/fixtures/api';
import apiResponses from '../../test/fixtures/apiResponses.json';

setupRouteTests();

const openScenarioMenu = async () => {
  const item = (await screen.findByText('#5 Baseline - stable load')).closest('li')!;
  fireEvent.click(within(item).getByTestId('MoreVertIcon').closest('button')!);
};

it('filters scenarios and opens the selected scenario details and settings', async () => {
  const fetchMock = vi.mocked(fetch);
  const store = renderRoute('/services/3/scenarios');
  const search = await screen.findByPlaceholderText('Search by name');
  fireEvent.change(search, { target: { value: 'regression' } });
  expect(screen.queryByText('#5 Baseline - stable load')).not.toBeInTheDocument();
  expect(screen.getByText('#6 Regression - slow downstream')).toBeInTheDocument();
  fireEvent.change(search, { target: { value: '' } });

  fireEvent.click(screen.getByText('#5 Baseline - stable load'));
  expect(await screen.findByRole('dialog', { name: 'Scenario details' })).toBeInTheDocument();
  await waitFor(() => expect(store.getState().scenarios.scenarioDetails.id).toBe(5));
  fireEvent.click(within(screen.getByRole('dialog', { name: 'Scenario details' })).getByRole('button', { name: 'Cancel' }));

  await openScenarioMenu();
  fireEvent.click(screen.getByRole('menuitem', { name: 'Settings' }));
  expect(await screen.findByRole('dialog', { name: 'Scenario settings' })).toBeInTheDocument();
  await waitFor(() => expect(store.getState().scenarios.scenarioSettings.methodsSettings).toHaveLength(3));
  const settingsDialog = screen.getByRole('dialog', { name: 'Scenario settings' });
  fireEvent.click(within(settingsDialog).getByTestId('AddIcon').closest('button')!);
  fireEvent.click(within(settingsDialog).getByRole('button', { name: 'Confirm' }));
  await waitFor(() => {
    const request = fetchMock.mock.calls.find(([url, options]) =>
      new URL(url as string).pathname === '/api/v1/scenario-settings/5' && options?.method === 'PATCH');
    expect(JSON.parse(request![1]!.body as string).methodsSettings).toHaveLength(4);
  });
});

it('creates a scenario from the settings page and updates the visible list', async () => {
  const details = { ...apiResponses['/scenarios/details/5'].details, id: 22, name: 'Holiday peak' };
  const fetchMock = mockDemoApi({ 'POST /scenarios': { details } });
  const store = renderRoute('/services/3/scenarios');
  await screen.findByText('#5 Baseline - stable load');
  fireEvent.click(screen.getByTestId('AddIcon').closest('button')!);
  const dialog = screen.getByRole('dialog', { name: 'Create scenario' });
  fireEvent.change(within(dialog).getByRole('textbox', { name: 'Name' }), { target: { value: 'Holiday peak' } });
  fireEvent.click(within(dialog).getByRole('button', { name: 'Confirm' }));

  expect(await screen.findByText('#22 Holiday peak')).toBeInTheDocument();
  await waitFor(() => expect(screen.queryByRole('dialog', { name: 'Create scenario' })).not.toBeInTheDocument());
  const request = fetchMock.mock.calls.find(([url, options]) =>
    new URL(url).pathname === '/api/v1/scenarios' && options?.method === 'POST');
  expect(JSON.parse(request![1]!.body as string)).toMatchObject({ serviceId: 3, name: 'Holiday peak' });
  expect(store.getState().scenarios.scenarios.some((scenario) => scenario.id === 22)).toBe(true);
});

it('edits and deletes a scenario through its menu', async () => {
  const details = { ...apiResponses['/scenarios/details/5'].details, name: 'Baseline retuned' };
  const fetchMock = mockDemoApi({ 'PATCH /scenarios/5': { details }, 'DELETE /scenarios/5': {} });
  const store = renderRoute('/services/3/scenarios');
  await openScenarioMenu();
  fireEvent.click(screen.getByRole('menuitem', { name: 'Edit' }));
  const dialog = await screen.findByRole('dialog', { name: 'Update scenario' });
  await waitFor(() => expect(within(dialog).getByRole('textbox', { name: 'Name' })).toHaveValue('Baseline - stable load'));
  fireEvent.change(within(dialog).getByRole('textbox', { name: 'Name' }), { target: { value: 'Baseline retuned' } });
  fireEvent.click(within(dialog).getByRole('button', { name: 'Confirm' }));
  expect(await screen.findByText('#5 Baseline retuned')).toBeInTheDocument();
  expect(fetchMock.mock.calls.some(([url, options]) =>
    new URL(url).pathname === '/api/v1/scenarios/5' && options?.method === 'PATCH')).toBe(true);

  const item = screen.getByText('#5 Baseline retuned').closest('li')!;
  fireEvent.click(within(item).getByTestId('MoreVertIcon').closest('button')!);
  fireEvent.click(screen.getByRole('menuitem', { name: 'Delete' }));
  const confirmation = screen.getByRole('dialog', { name: 'Delete scenario?' });
  fireEvent.click(within(confirmation).getByRole('button', { name: 'Confirm' }));
  await waitFor(() => expect(store.getState().scenarios.scenarios.some((scenario) => scenario.id === 5)).toBe(false));
  expect(screen.queryByText('#5 Baseline retuned')).not.toBeInTheDocument();
});

it('edits and removes per-method scenario targets before saving', async () => {
  const fetchMock = mockDemoApi({
    'PATCH /scenario-settings/5': apiResponses['/scenario-settings/5']
  });
  renderRoute('/services/3/scenarios');
  await openScenarioMenu();
  fireEvent.click(screen.getByRole('menuitem', { name: 'Settings' }));
  const settingsDialog = await screen.findByRole('dialog', { name: 'Scenario settings' });
  await within(settingsDialog).findByText('GET /cart');
  fireEvent.click(within(settingsDialog).getByText('GET /cart'));
  const methodDialog = await screen.findByRole('dialog', { name: 'Update scenario method settings' });
  fireEvent.mouseDown(within(methodDialog).getByRole('combobox', { name: 'Method' }));
  fireEvent.click(screen.getByRole('option', { name: /GET \/shipping\/rates/ }));
  fireEvent.click(within(methodDialog).getByRole('button', { name: 'Confirm' }));
  expect(await within(settingsDialog).findByText('GET /shipping/rates')).toBeInTheDocument();

  const last = within(settingsDialog).getByText('POST /checkout').closest('li')!;
  fireEvent.click(within(last).getByTestId('MoreVertIcon').closest('button')!);
  fireEvent.click(screen.getByRole('menuitem', { name: 'Delete' }));
  expect(within(settingsDialog).queryByText('POST /checkout')).not.toBeInTheDocument();
  fireEvent.click(await within(settingsDialog).findByRole('button', { name: 'Confirm' }, { timeout: 5000 }));
  await waitFor(() => {
    const patch = fetchMock.mock.calls.find(([url, options]) =>
      new URL(url).pathname.endsWith('/scenario-settings/5') && options?.method === 'PATCH');
    const methods = JSON.parse(patch![1]!.body as string).methodsSettings;
    expect(methods).toHaveLength(2);
    expect(methods[0]).toMatchObject({ method: 'GET /shipping/rates', protocol: 'http' });
  });
});

it('restores a scenario from a shared URL', async () => {
  const store = renderRoute('/services/3/results?scenarioId=5');
  await waitFor(() => expect(store.getState().scenarios.scenario.id).toBe(5));
  expect(await screen.findByText(/#64 Load tests for/, {}, { timeout: 12000 })).toBeInTheDocument();
  expect(vi.mocked(fetch).mock.calls.some(([url]) =>
    new URL(url as string).pathname.endsWith('/scenarios/5'))).toBe(true);
});

it('keeps browsing results when the scenario in a shared URL is unavailable', async () => {
  mockDemoApi({}, { 'GET /scenarios/5': { status: 404, body: { detail: 'Scenario not found' } } });
  const store = renderRoute('/services/3/results?scenarioId=5');
  expect(await screen.findByText(/#64 Load tests for/, {}, { timeout: 12000 })).toBeInTheDocument();
  expect(store.getState().scenarios.scenario.id).toBe(0);
});

it('shows scenario creation validation errors without adding a record', async () => {
  mockDemoApi({}, { 'POST /scenarios': {
    status: 422, body: { detail: [{ loc: ['body', 'name'], msg: 'Scenario name is required' }] }
  } });
  const store = renderRoute('/services/3/scenarios');
  await screen.findByText('#5 Baseline - stable load', {}, { timeout: 12000 });
  fireEvent.click(screen.getByTestId('AddIcon').closest('button')!);
  const dialog = screen.getByRole('dialog', { name: 'Create scenario' });
  fireEvent.click(within(dialog).getByRole('button', { name: 'Confirm' }));
  expect(await screen.findByText('Scenario name is required')).toBeInTheDocument();
  expect(store.getState().scenarios.scenarios).toHaveLength(3);
});
