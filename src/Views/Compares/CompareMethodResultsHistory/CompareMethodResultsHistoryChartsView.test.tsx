import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createAppStore } from '../../../Redux/Store';
import { SettingsManager } from '../../../Services/Config';
import { CompareMethodResultsHistoryProvider } from '../../../Providers/Compares/CompareMethodResultsHistoryProvider';
import { CompareMethodResultsHistoryChartsView } from './CompareMethodResultsHistoryChartsView';
import { mockDemoApi } from '../../../test/fixtures/api';
import { ProtocolType } from '../../../Models/Results/MethodResults';
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

it('loads all method history metrics for two runs and renders the selected charts', async () => {
  const store = createAppStore(null);
  enableAllWidgetCharts(store, ChartWidgetType.CompareMethodResultsHistoryCharts);
  render(<Provider store={store}>
    <CompareMethodResultsHistoryProvider>
      <CompareMethodResultsHistoryChartsView
        method="GET /cart"
        protocol={ProtocolType.HTTP}
        loadTestResultId={64}
        compareWithLoadTestResults={[63]}
      />
    </CompareMethodResultsHistoryProvider>
  </Provider>);

  await waitFor(() => {
    const history = store.getState().compareMethodResultsHistory;
    expect(history.compareMethodResultsHistoryResponseTimes).toHaveLength(2);
    expect(history.compareMethodResultsHistoryNumberOfUsers).toHaveLength(2);
    expect(history.compareMethodResultsHistoryNumberOfRequests).toHaveLength(2);
    expect(history.compareMethodResultsHistoryRequestsPerSecond).toHaveLength(2);
  });
  expect(screen.getByText('Comparison charts for GET /cart method')).toBeInTheDocument();
  const requests = vi.mocked(fetch).mock.calls.map(([url]) => new URL(url as string).pathname);
  expect(requests.filter((path) => path.startsWith('/api/v1/compares/compare-method-results-history-'))).toHaveLength(4);
  expect(screen.getByText('Average response time (ms)')).toBeInTheDocument();
  expect(screen.getByText('Min response time (ms)')).toBeInTheDocument();
  expect(screen.getByText('Number of failures')).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('CloseIcon').closest('button')!);
  expect(screen.queryByText('Average response time (ms)')).not.toBeInTheDocument();
});
