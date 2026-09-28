import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { CreateServiceModal } from './CreateServiceModal';
import { ServicesProvider } from '../../../Providers/Services/ServicesProvider';
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

describe('CreateServiceModal', () => {
  it('submits the form, updates the service list and closes after success', async () => {
    const fetchMock = mockSuccessfulFetch({ details: {
      id: 7, url: 'https://checkout.example.com', name: 'Checkout', cluster: 'prod',
      namespace: 'payments', numberOfScenarios: 0, numberOfLoadTestResults: 0
    } });
    const setModal = vi.fn();
    const { store } = renderWithStore(
      <ServicesProvider><CreateServiceModal modal setModal={setModal} /></ServicesProvider>
    );

    fireEvent.change(screen.getByRole('textbox', { name: 'URL' }), {
      target: { value: 'https://checkout.example.com' }
    });
    fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), { target: { value: 'Checkout' } });
    fireEvent.change(screen.getByRole('textbox', { name: 'Cluster' }), { target: { value: 'prod' } });
    fireEvent.change(screen.getByRole('textbox', { name: 'Namespace' }), { target: { value: 'payments' } });
    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));

    await waitFor(() => expect(setModal).toHaveBeenCalledWith(false));
    expect(readFetchCall(fetchMock)).toEqual({
      url: 'https://api.example.com/api/v1/services', method: 'POST',
      body: { url: 'https://checkout.example.com', name: 'Checkout', cluster: 'prod', namespace: 'payments' }
    });
    expect(store.getState().services.services[0]).toMatchObject({ id: 7, name: 'Checkout' });
  });

  it('keeps the modal open and shows server validation errors', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false, status: 422,
      json: async () => ({ detail: [{ loc: ['body', 'name'], msg: 'Name is required' }] })
    }));
    const setModal = vi.fn();
    renderWithStore(<ServicesProvider><CreateServiceModal modal setModal={setModal} /></ServicesProvider>);

    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));

    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(setModal).not.toHaveBeenCalled();
  });
});
