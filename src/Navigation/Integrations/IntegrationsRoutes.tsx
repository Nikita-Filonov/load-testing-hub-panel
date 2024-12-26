import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ServicesDrawer } from '../../Components/Navigation/Services/ServicesDrawer';

const IntegrationsPage = lazy(() => import('../../Pages/Integrations/IntegrationsPage'));

export const IntegrationsRoutes = () => {
  return (
    <Routes>
      <Route element={<ServicesDrawer />}>
        <Route index element={<IntegrationsPage />} />
      </Route>
    </Routes>
  );
};
