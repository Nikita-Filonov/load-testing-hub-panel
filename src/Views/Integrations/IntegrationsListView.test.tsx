import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import IntegrationsListView from './IntegrationsListView';
import { IntegrationsProvider } from '../../Providers/Integrations/IntegrationsProvider';
import { setService } from '../../Redux/Services/Services/Slice';
import { SettingsManager } from '../../Services/Config';
import { mockSuccessfulFetch, readFetchCall } from '../../test/fixtures/http';
import { renderWithStore } from '../../test/fixtures/render';

const SetCurrentService = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setService({ id: 7, name: 'Checkout', url: '',
      numberOfScenarios: 0, numberOfLoadTestResults: 0 }));
  }, [dispatch]);
  return null;
};

beforeEach(() => SettingsManager.setup({
  serverUrl: 'https://api.example.com', apiVersion: '/api/v1',
  apiDateFormat: '', apiTimeFormat: '', durationFormat: '', pickerDateFormat: '', pickerTimeFormat: ''
}));

afterEach(() => {
  vi.unstubAllGlobals();
  SettingsManager.setup(null);
});

it('loads integrations for the selected service and filters by name', async () => {
  const fetchMock = mockSuccessfulFetch({ integrations: [
    { id: 1, name: 'Metrics', systemType: 'GRAFANA', environmentType: 'PRODUCTION',
      orderIndex: 0, urlTemplate: 'https://grafana.example.com' },
    { id: 2, name: 'Logs', systemType: 'KIBANA', environmentType: 'INTERNAL',
      orderIndex: 1, urlTemplate: 'https://kibana.example.com' }
  ] });
  renderWithStore(<IntegrationsProvider>
    <SetCurrentService />
    <IntegrationsListView />
  </IntegrationsProvider>);

  expect(await screen.findByText('Metrics')).toBeInTheDocument();
  expect(screen.getByText('Logs')).toBeInTheDocument();
  fireEvent.change(screen.getByRole('textbox', { name: 'Search' }), { target: { value: 'met' } });

  expect(screen.getByText('Metrics')).toBeInTheDocument();
  expect(screen.queryByText('Logs')).not.toBeInTheDocument();
  expect(readFetchCall(fetchMock).url).toBe('https://api.example.com/api/v1/integrations?serviceId=7');
});
