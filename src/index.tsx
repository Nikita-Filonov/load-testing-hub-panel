import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFound } from './Pages/NotFound';
import { AppRoutes } from './Services/Navigation/Routing';
import { store } from './Redux/Store';
import { RehydrationGate } from './Providers/RehydrationGate';
import { SuspenseBackdropView } from './Components/Views/SuspenseBackdropView';
import { createRoot } from 'react-dom/client';
import { ResultsRoutes } from './Navigation/Results/ResultsRoutes';
import { ThemeProvider } from './Providers/ThemeProvider';
import { ServicesRoutes } from './Navigation/Services/ServicesRoutes';
import { DashboardRoutes } from './Navigation/Dashboard/DashboardRoutes';
import { MethodsRoutes } from './Navigation/Methods/MethodsRoutes';
import { ScenariosRoutes } from './Navigation/Scenarios/ScenariosRoutes';
import { ServicesRedirect } from './Navigation/Services/ServicesRedirect';
import { SettingsRoutes } from './Navigation/Settings/SettingsRoutes';
import { IntegrationsRoutes } from './Navigation/Integrations/IntegrationsRoutes';
import { ServicesRoutesLoader } from './Navigation/Services/ServicesRoutesLoader';
import { ConfigProvider } from './Providers/ConfigProvider';

const IndexRoute = () => {
  return (
    <Suspense fallback={<SuspenseBackdropView />}>
      <Routes>
        <Route path={AppRoutes.Root} element={<ServicesRedirect />} />
        <Route path={`${AppRoutes.Services}/*`} element={<ServicesRoutes />} />
        <Route path={AppRoutes.ServiceDetails} element={<ServicesRoutesLoader />}>
          <Route path={AppRoutes.ServiceDetails} element={<ServicesRedirect />} />
          <Route path={`${AppRoutes.ServiceResults}/*`} element={<ResultsRoutes />} />
          <Route path={`${AppRoutes.ServiceMethods}/*`} element={<MethodsRoutes />} />
          <Route path={`${AppRoutes.ServiceSettings}/*`} element={<SettingsRoutes />} />
          <Route path={`${AppRoutes.ServiceScenarios}/*`} element={<ScenariosRoutes />} />
          <Route path={`${AppRoutes.ServiceDashboard}/*`} element={<DashboardRoutes />} />
          <Route path={`${AppRoutes.ServiceIntegrations}/*`} element={<IntegrationsRoutes />} />
        </Route>
        <Route path={AppRoutes.NotFound} element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ConfigProvider>
      <Provider store={store}>
        <RehydrationGate>
          <ThemeProvider>
            <BrowserRouter>
              <IndexRoute />
            </BrowserRouter>
          </ThemeProvider>
        </RehydrationGate>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
