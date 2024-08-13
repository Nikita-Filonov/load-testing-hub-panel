import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PublicRoute } from './Navigation/PublicRoute';
import reportWebVitals from './reportWebVitals';
import { NotFound } from './Pages/NotFound';
import { AppRoutes } from './Services/Constants/Routing';
import { persistor, store } from './Redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { SuspenseBackdropView } from './Components/Views/SuspenseBackdropView';
import { NavigationDrawer } from './Components/Navigation/NavigationDrawer';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from './Providers/ConfigProvider';
import { ResultsRoutes } from './Navigation/Results/ResultsRoutes';
import { ThemeProvider } from './Providers/ThemeProvider';
import { DashboardRoutes } from './Navigation/Dashboard/DashboardRoutes';
import { Home } from './Pages/Home';
import { MethodsRoutes } from './Navigation/Methods/MethodsRoutes';
import { ScenariosRoutes } from './Navigation/Scenarios/ScenariosRoutes';

const IndexRoute = () => {
  return (
    <Suspense fallback={<SuspenseBackdropView />}>
      <NavigationDrawer>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path={AppRoutes.Home} element={<Home />} />
            <Route path={`${AppRoutes.Results}/*`} element={<ResultsRoutes />} />
            <Route path={`${AppRoutes.Methods}/*`} element={<MethodsRoutes />} />
            <Route path={`${AppRoutes.Scenarios}/*`} element={<ScenariosRoutes />} />
            <Route path={`${AppRoutes.Dashboard}/*`} element={<DashboardRoutes />} />
            <Route path={AppRoutes.NotFound} element={<NotFound />} />
          </Route>
        </Routes>
      </NavigationDrawer>
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
