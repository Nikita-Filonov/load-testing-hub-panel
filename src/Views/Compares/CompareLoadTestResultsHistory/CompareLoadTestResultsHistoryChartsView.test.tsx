import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createAppStore } from '../../../Redux/Store';
import { SettingsManager } from '../../../Services/Config';
import { CompareLoadTestResultsHistoryProvider } from '../../../Providers/Compares/CompareLoadTestResultsHistoryProvider';
import { CompareLoadTestResultsHistoryChartsView } from './CompareLoadTestResultsHistoryChartsView';
import { mockDemoApi } from '../../../test/fixtures/api';
import { ChartWidgetType } from '../../../Models/Core/ChartSettings';
import { enableAllWidgetCharts } from '../../../test/fixtures/charts';

beforeEach(() => {
  SettingsManager.setup({
    serverUrl: 'https://api.example.com', apiVersion: '/api/v1',
    apiDateFormat: 'YYYY-MM-DD', apiTimeFormat: 'HH:mm:ss', durationFormat: 'm[m]s[s]',
    pickerDateFormat: 'dd.MM.yyyy', pickerTimeFormat: 'HH:mm'
  });
  mockDemoApi();
});

afterEach(() => {
  vi.unstubAllGlobals();
  SettingsManager.setup(null);
});

it('loads four metric series when another load test result is selected', async () => {
  const store = createAppStore(null);
  enableAllWidgetCharts(store, ChartWidgetType.CompareLoadTestResultsHistoryCharts);
  render(<Provider store={store}>
    <CompareLoadTestResultsHistoryProvider>
      <CompareLoadTestResultsHistoryChartsView loadTestResultId={64} compareWithLoadTestResults={[62]} />
    </CompareLoadTestResultsHistoryProvider>
  </Provider>);

  await waitFor(() => {
    const history = store.getState().compareLoadTestResultsHistory;
    expect(history.compareLoadTestResultsHistoryResponseTimes).toHaveLength(2);
    expect(history.compareLoadTestResultsHistoryNumberOfUsers).toHaveLength(2);
    expect(history.compareLoadTestResultsHistoryNumberOfRequests).toHaveLength(2);
    expect(history.compareLoadTestResultsHistoryRequestsPerSecond).toHaveLength(2);
  });
  expect(screen.getByText('Comparison charts')).toBeInTheDocument();
  expect(vi.mocked(fetch).mock.calls.filter(([url]) =>
    new URL(url as string).pathname.startsWith('/api/v1/compares/compare-load-test-results-history-'))).toHaveLength(4);
  expect(screen.queryByText('Average response time (ms)')).not.toBeInTheDocument();
  fireEvent.click(screen.getByTestId('AddIcon').closest('button')!);
  expect(screen.getByText('Average response time (ms)')).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('CloseIcon').closest('button')!);
  expect(screen.queryByText('Average response time (ms)')).not.toBeInTheDocument();
});
