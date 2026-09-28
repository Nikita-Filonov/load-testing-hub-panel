import { afterEach, beforeEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { createAppStore } from '../../Redux/Store';
import { SettingsManager } from '../../Services/Config';
import { ThemeProvider } from '../../Providers/ThemeProvider';
import { ServicesRoutesLoader } from '../../Navigation/Services/ServicesRoutesLoader';
import { ServicesRoutes } from '../../Navigation/Services/ServicesRoutes';
import { ResultsRoutes } from '../../Navigation/Results/ResultsRoutes';
import { DashboardRoutes } from '../../Navigation/Dashboard/DashboardRoutes';
import { MethodsRoutes } from '../../Navigation/Methods/MethodsRoutes';
import { ScenariosRoutes } from '../../Navigation/Scenarios/ScenariosRoutes';
import { IntegrationsRoutes } from '../../Navigation/Integrations/IntegrationsRoutes';
import { SettingsRoutes } from '../../Navigation/Settings/SettingsRoutes';
import { mockDemoApi } from './api';
import { ChartWidgetType } from '../../Models/Core/ChartSettings';
import { enableAllWidgetCharts } from './charts';

export const setupRouteTests = () => {
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
};

export const renderRoute = (path: string, allDashboardCharts = false) => {
  const store = createAppStore(null);
  if (allDashboardCharts) {
    enableAllWidgetCharts(store, ChartWidgetType.DashboardMethodsCharts);
  }
  render(
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter initialEntries={[path]}>
          <Suspense fallback={<div>Loading page</div>}>
            <Routes>
              <Route path="/services/*" element={<ServicesRoutes />} />
              <Route path="/services/:serviceId" element={<ServicesRoutesLoader />}>
                <Route path="results/*" element={<ResultsRoutes />} />
                <Route path="dashboard/*" element={<DashboardRoutes />} />
                <Route path="methods/*" element={<MethodsRoutes />} />
                <Route path="scenarios/*" element={<ScenariosRoutes />} />
                <Route path="integrations/*" element={<IntegrationsRoutes />} />
                <Route path="settings/*" element={<SettingsRoutes />} />
              </Route>
            </Routes>
          </Suspense>
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );
  return store;
};
