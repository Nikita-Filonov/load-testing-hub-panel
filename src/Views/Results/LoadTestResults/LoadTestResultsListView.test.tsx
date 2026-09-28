import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import LoadTestResultsListView from './LoadTestResultsListView';
import { LoadTestResultsProvider } from '../../../Providers/Results/LoadTestResultsProvider';
import { setService } from '../../../Redux/Services/Services/Slice';
import { setScenario } from '../../../Redux/Services/Scenarios/Slice';
import { ScenarioTag } from '../../../Models/Services/Scenarios';
import { LoadTestResult } from '../../../Models/Results/LoadTestResults';
import { SettingsManager } from '../../../Services/Config';
import { renderWithStore } from '../../../test/fixtures/render';

const service = { id: 7, name: 'Checkout', url: '', numberOfScenarios: 1, numberOfLoadTestResults: 21 };
const scenario = { id: 3, name: 'Peak traffic', tags: [ScenarioTag.Latest], version: '1' };

const makeResult = (id: number): LoadTestResult => ({
  id, service, scenario, numberOfUsers: 10, numberOfRequests: 100, numberOfFailures: 2,
  requestsPerSecond: 5, failuresPerSecond: 0.1, comment: null, duration: 60,
  startedAt: '2026-09-28T10:00:00', finishedAt: '2026-09-28T10:01:00', compare: null,
  triggerCIJobUrl: null, triggerCIPipelineUrl: null, triggerCIProjectVersion: null,
  loadTestsCIJobUrl: null, loadTestsCIPipelineUrl: null
});

const SetCurrentContext = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setService(service));
    dispatch(setScenario(scenario));
  }, [dispatch]);
  return null;
};

beforeEach(() => SettingsManager.setup({
  serverUrl: 'https://api.example.com', apiVersion: '/api/v1', apiDateFormat: 'YYYY-MM-DD',
  apiTimeFormat: 'HH:mm:ss', durationFormat: 'm[m]s[s]', pickerDateFormat: '', pickerTimeFormat: ''
}));

afterEach(() => {
  vi.unstubAllGlobals();
  SettingsManager.setup(null);
});

it('fetches results for the selected scenario and requests the next page', async () => {
  const fetchMock = vi.fn().mockImplementation(async (url: string) => ({
    ok: true, status: 200,
    json: async () => ({ items: [makeResult(new URL(url).searchParams.get('offset') === '20' ? 32 : 31)],
      total: 21, limit: 20, offset: Number(new URL(url).searchParams.get('offset')) })
  }));
  vi.stubGlobal('fetch', fetchMock);
  renderWithStore(<MemoryRouter initialEntries={['/services/7/results']}>
    <LoadTestResultsProvider>
      <SetCurrentContext />
      <LoadTestResultsListView />
    </LoadTestResultsProvider>
  </MemoryRouter>);

  expect(await screen.findByText('#31 Load tests for Checkout, Peak traffic scenario')).toBeInTheDocument();
  expect(screen.getByText('Total results 21')).toBeInTheDocument();
  const firstUrl = new URL(fetchMock.mock.calls[0][0] as string);
  expect(firstUrl.pathname).toBe('/api/v1/load-test-results');
  expect(Object.fromEntries(firstUrl.searchParams)).toMatchObject({
    serviceId: '7', scenarioId: '3', limit: '20', offset: '0'
  });

  fireEvent.click(screen.getByRole('button', { name: 'Go to page 2' }));
  expect(await screen.findByText('#32 Load tests for Checkout, Peak traffic scenario')).toBeInTheDocument();
  await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
  expect(new URL(fetchMock.mock.calls[1][0] as string).searchParams.get('offset')).toBe('20');

  fireEvent.click(screen.getByTestId('FilterAltOutlinedIcon').closest('button') as HTMLButtonElement);
  const filters = screen.getByRole('dialog', { name: 'Load tests results filters' });
  fireEvent.change(within(filters).getByRole('textbox', { name: 'Version' }), {
    target: { value: 'release-2026' }
  });
  fireEvent.click(within(filters).getByRole('button', { name: 'Confirm' }));

  await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(3));
  expect(new URL(fetchMock.mock.calls[2][0] as string).searchParams.get('triggerCIProjectVersion'))
    .toBe('release-2026');
});
