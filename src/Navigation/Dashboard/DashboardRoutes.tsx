import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ServicesDrawer } from '../../Components/Navigation/Services/ServicesDrawer';

const DashboardPage = lazy(() => import('../../Pages/Dashboard/DashboardPage'));

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route element={<ServicesDrawer />}>
        <Route index element={<DashboardPage />} />
      </Route>
    </Routes>
  );
};
