import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute';

const DashboardPage = lazy(() => import('../../Pages/Dashboard/DashboardPage'));

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={true} />}>
        <Route index element={<DashboardPage />} />
      </Route>
    </Routes>
  );
};
