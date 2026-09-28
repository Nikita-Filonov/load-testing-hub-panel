import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { CreateIntegrationModal } from './CreateIntegrationModal';
import { IntegrationsProvider } from '../../../Providers/Integrations/IntegrationsProvider';
import { SettingsManager } from '../../../Services/Config';
import { mockSuccessfulFetch, readFetchCall } from '../../../test/fixtures/http';
import { renderWithStore } from '../../../test/fixtures/render';

beforeEach(() => SettingsManager.setup({
  serverUrl: 'https://api.example.com', apiVersion: '/api/v1',
  apiDateFormat: '', apiTimeFormat: '', durationFormat: '', pickerDateFormat: '', pickerTimeFormat: ''
}));

afterEach(() => {
  vi.unstubAllGlobals();
  SettingsManager.setup(null);
});

describe('CreateIntegrationModal', () => {
  it('submits edited values with the current service ID and updates the list', async () => {
    const integration = {
      id: 12, name: 'Monitoring', systemType: 'GRAFANA', environmentType: 'PRODUCTION',
      orderIndex: 4, urlTemplate: 'https://grafana.example.com/{base_url}'
    };
    const fetchMock = mockSuccessfulFetch({ integration });
    const setModal = vi.fn();
    const { store } = renderWithStore(
      <IntegrationsProvider>
        <CreateIntegrationModal modal setModal={setModal} serviceId={7} />
      </IntegrationsProvider>
    );

    fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), { target: { value: 'Monitoring' } });
    fireEvent.change(screen.getByRole('spinbutton', { name: 'Order index' }), { target: { value: '4' } });
    fireEvent.change(screen.getByRole('textbox', { name: 'URL template' }), {
      target: { value: 'https://grafana.example.com/{base_url}' }
    });
    fireEvent.mouseDown(screen.getByRole('combobox', { name: 'System type' }));
    fireEvent.click(screen.getByRole('option', { name: 'Grafana' }));
    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));

    await waitFor(() => expect(setModal).toHaveBeenCalledWith(false));
    expect(readFetchCall(fetchMock)).toEqual({
      url: 'https://api.example.com/api/v1/integrations', method: 'POST',
      body: { serviceId: 7, name: 'Monitoring', systemType: 'GRAFANA',
        environmentType: 'PRODUCTION', orderIndex: 4,
        urlTemplate: 'https://grafana.example.com/{base_url}' }
    });
    expect(store.getState().integrations.integrations).toEqual([integration]);
  });

  it('shows URL validation errors without closing the form', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false, status: 422,
      json: async () => ({ detail: [{ loc: ['body', 'urlTemplate'], msg: 'Invalid template' }] })
    }));
    const setModal = vi.fn();
    renderWithStore(
      <IntegrationsProvider>
        <CreateIntegrationModal modal setModal={setModal} serviceId={7} />
      </IntegrationsProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));

    expect(await screen.findByText('Invalid template')).toBeInTheDocument();
    expect(setModal).not.toHaveBeenCalled();
  });
});
