import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ServicesListView from './ServicesListView';
import { ServicesProvider } from '../../Providers/Services/ServicesProvider';
import { SettingsManager } from '../../Services/Config';
import { mockSuccessfulFetch, readFetchCall } from '../../test/fixtures/http';
import { renderWithStore } from '../../test/fixtures/render';

beforeEach(() => SettingsManager.setup({
  serverUrl: 'https://api.example.com', apiVersion: '/api/v1',
  apiDateFormat: '', apiTimeFormat: '', durationFormat: '', pickerDateFormat: '', pickerTimeFormat: ''
}));

afterEach(() => {
  vi.unstubAllGlobals();
  SettingsManager.setup(null);
});

const renderList = () => renderWithStore(
  <MemoryRouter initialEntries={['/services']}>
    <ServicesProvider><ServicesListView /></ServicesProvider>
  </MemoryRouter>
);

describe('ServicesListView', () => {
  it('loads services and filters the visible list by name', async () => {
    const fetchMock = mockSuccessfulFetch({ services: [
      { id: 7, name: 'Checkout', url: 'https://checkout.example.com',
        numberOfScenarios: 2, numberOfLoadTestResults: 3 },
      { id: 8, name: 'Search', url: 'https://search.example.com',
        numberOfScenarios: 1, numberOfLoadTestResults: 1 }
    ] });
    renderList();

    expect(await screen.findByText('#7 Checkout')).toBeInTheDocument();
    expect(screen.getByText('#8 Search')).toBeInTheDocument();
    fireEvent.change(screen.getByRole('textbox', { name: 'Search' }), { target: { value: 'CHECK' } });

    expect(screen.getByText('#7 Checkout')).toBeInTheDocument();
    expect(screen.queryByText('#8 Search')).not.toBeInTheDocument();
    expect(readFetchCall(fetchMock).url).toBe('https://api.example.com/api/v1/services');
  });

  it('shows the empty state when the API returns no services', async () => {
    mockSuccessfulFetch({ services: [] });
    renderList();

    expect(await screen.findByText('There is no services')).toBeInTheDocument();
  });
});
