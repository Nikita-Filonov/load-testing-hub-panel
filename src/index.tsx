import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { NotFound } from './Pages/NotFound';
import { AppRoutes } from './Services/Constants/Routing';
import { persistor, store } from './Redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { SuspenseBackdropView } from './Components/Views/SuspenseBackdropView';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from './Providers/ConfigProvider';
import { ResultsRoutes } from './Navigation/Results/ResultsRoutes';
import { ThemeProvider } from './Providers/ThemeProvider';
import { ServicesRoutes } from './Navigation/Services/ServicesRoutes';
import { DashboardRoutes } from './Navigation/Dashboard/DashboardRoutes';
import { MethodsRoutes } from './Navigation/Methods/MethodsRoutes';
import { ScenariosRoutes } from './Navigation/Scenarios/ScenariosRoutes';
import { ComparesRoutes } from './Navigation/Compares/ComparesRoutes';
import { ServicesRedirect } from './Navigation/Services/ServicesRedirect';
import { ServicesRoutesLoader } from './Navigation/Services/ServicesRoutesLoader';
import { ServicesProvider } from './Providers/Services/ServicesProvider';

const IndexRoute = () => {
  return (
    <Suspense fallback={<SuspenseBackdropView />}>
      <Routes>
        <Route path={AppRoutes.Root} element={<ServicesRedirect />} />
        <Route path={`${AppRoutes.Services}/*`} element={<ServicesRoutes />} />
        <Route
          path={AppRoutes.ServiceDetails}
          element={
            <ServicesProvider>
              <ServicesRoutesLoader />
            </ServicesProvider>
          }>
          <Route path={AppRoutes.ServiceDetails} element={<ServicesRedirect />} />
          <Route path={`${AppRoutes.ServiceResults}/*`} element={<ResultsRoutes />} />
          <Route path={`${AppRoutes.ServiceMethods}/*`} element={<MethodsRoutes />} />
          <Route path={`${AppRoutes.ServiceCompares}/*`} element={<ComparesRoutes />} />
          <Route path={`${AppRoutes.ServiceScenarios}/*`} element={<ScenariosRoutes />} />
          <Route path={`${AppRoutes.ServiceDashboard}/*`} element={<DashboardRoutes />} />
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
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <BrowserRouter>
              <IndexRoute />
            </BrowserRouter>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
