import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { ReactElement } from 'react';
import { renderWithStore } from '../../test/fixtures/render';
import { SettingsManager } from '../../Services/Config';
import { mockDemoApi } from '../../test/fixtures/api';
import { ServicesProvider } from '../../Providers/Services/ServicesProvider';
import { ScenariosProvider } from '../../Providers/Services/ScenariosProvider';
import { IntegrationsProvider } from '../../Providers/Integrations/IntegrationsProvider';
import { LoadTestResultsProvider } from '../../Providers/Results/LoadTestResultsProvider';
import { DeleteServiceModal } from './Services/DeleteServiceModal';
import { DeleteScenarioModal } from './Scenarios/DeleteScenarioModal';
import { DeleteIntegrationModal } from './Integrations/DeleteIntegrationModal';
import { DeleteLoadTestResultModal } from './Results/LoadTestsResults/DeleteLoadTestResultModal';

beforeEach(() => SettingsManager.setup({
  serverUrl: 'https://api.example.com', apiVersion: '/api/v1', apiDateFormat: '', apiTimeFormat: '',
  durationFormat: '', pickerDateFormat: '', pickerTimeFormat: ''
}));

afterEach(() => {
  vi.unstubAllGlobals();
  SettingsManager.setup(null);
});

type Case = [string, string, (setModal: (open: boolean) => void) => ReactElement];
const cases: Case[] = [
  ['service', '/services/3', (setModal) => <ServicesProvider>
    <DeleteServiceModal modal setModal={setModal} serviceId={3} />
  </ServicesProvider>],
  ['scenario', '/scenarios/5', (setModal) => <ScenariosProvider>
    <DeleteScenarioModal modal setModal={setModal} scenarioId={5} />
  </ScenariosProvider>],
  ['integration', '/integrations/3', (setModal) => <IntegrationsProvider>
    <DeleteIntegrationModal modal setModal={setModal} integrationId={3} />
  </IntegrationsProvider>],
  ['load test result', '/load-test-results/64', (setModal) => <LoadTestResultsProvider>
    <DeleteLoadTestResultModal modal setModal={setModal} loadTestResultId={64} />
  </LoadTestResultsProvider>]
];

it.each(cases)('keeps the %s confirmation open when deletion fails', async (_name, endpoint, element) => {
  const fetchMock = mockDemoApi({}, { [`DELETE ${endpoint}`]: {
    status: 500, body: { detail: 'Database is unavailable' }
  } });
  const setModal = vi.fn();
  renderWithStore(element(setModal));
  const confirm = screen.getByRole('button', { name: 'Confirm' });
  fireEvent.click(confirm);
  await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
  await waitFor(() => expect(confirm).not.toBeDisabled());
  expect(setModal).not.toHaveBeenCalled();
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});
