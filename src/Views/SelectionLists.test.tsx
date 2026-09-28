import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { createAppStore } from '../Redux/Store';
import { SettingsManager } from '../Services/Config';
import { mockDemoApi } from '../test/fixtures/api';
import responses from '../test/fixtures/apiResponses.json';
import { setService } from '../Redux/Services/Services/Slice';
import { ServicesProvider } from '../Providers/Services/ServicesProvider';
import { ScenariosProvider } from '../Providers/Services/ScenariosProvider';
import ServiceSelectionListView from './Services/ServiceSelectionListView';
import ScenarioSelectionListView from './Scenarios/ScenarioSelectionListView';

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

const CurrentPath = () => <span data-testid="path">{useLocation().pathname}</span>;

it('filters services and navigates only when another service is selected', async () => {
  const store = createAppStore(null);
  store.dispatch(setService(responses['/services/3'].service));
  const onSelect = vi.fn();
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/services/3/results']}>
        <ServicesProvider>
          <Routes>
            <Route path="/services/:serviceId/*" element={<><ServiceSelectionListView onSelectServiceCallback={onSelect} /><CurrentPath /></>} />
            <Route path="/services/4/results" element={<CurrentPath />} />
          </Routes>
        </ServicesProvider>
      </MemoryRouter>
    </Provider>
  );
  expect(await screen.findByText('#3 Demo - Checkout API')).toBeInTheDocument();
  const search = screen.getByPlaceholderText('Search by name');
  fireEvent.change(search, { target: { value: 'payments' } });
  expect(screen.queryByText('#3 Demo - Checkout API')).not.toBeInTheDocument();
  fireEvent.change(search, { target: { value: '' } });
  fireEvent.click(screen.getByText('#3 Demo - Checkout API'));
  expect(onSelect).toHaveBeenCalledTimes(1);
  expect(screen.getByTestId('path')).toHaveTextContent('/services/3/results');
  fireEvent.click(screen.getByText('#4 Demo - Payments API'));
  expect(onSelect).toHaveBeenCalledTimes(2);
  await waitFor(() => expect(screen.getByTestId('path')).toHaveTextContent('/services/4/results'));
  expect(store.getState().services.service.id).toBe(0);
});

it('filters, selects and clears scenarios within the selected service', async () => {
  const store = createAppStore(null);
  store.dispatch(setService(responses['/services/3'].service));
  const onSelect = vi.fn();
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/services/3/results']}>
        <ScenariosProvider>
          <ScenarioSelectionListView onSelectScenarioCallback={onSelect} />
        </ScenariosProvider>
      </MemoryRouter>
    </Provider>
  );
  expect(await screen.findByText('#5 Baseline - stable load')).toBeInTheDocument();
  const search = screen.getByPlaceholderText('Search by name');
  fireEvent.change(search, { target: { value: 'regression' } });
  expect(screen.queryByText('#5 Baseline - stable load')).not.toBeInTheDocument();
  fireEvent.change(search, { target: { value: '' } });
  fireEvent.click(screen.getByText('#5 Baseline - stable load'));
  expect(store.getState().scenarios.scenario.id).toBe(5);
  fireEvent.click(screen.getByText('#5 Baseline - stable load'));
  expect(store.getState().scenarios.scenario.id).toBe(0);
  expect(onSelect).toHaveBeenCalledTimes(2);
});
