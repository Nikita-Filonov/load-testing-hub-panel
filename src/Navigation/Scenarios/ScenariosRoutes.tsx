import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute';

const ScenariosPage = lazy(() => import('../../Pages/Scenarios/ScenariosPage'));

export const ScenariosRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={true} />}>
        <Route index element={<ScenariosPage />} />
      </Route>
    </Routes>
  );
};
