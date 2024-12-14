import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ServicesDrawer } from '../../Components/Navigation/Services/ServicesDrawer';

const ScenariosPage = lazy(() => import('../../Pages/Scenarios/ScenariosPage'));

export const ScenariosRoutes = () => {
  return (
    <Routes>
      <Route element={<ServicesDrawer />}>
        <Route index element={<ScenariosPage />} />
      </Route>
    </Routes>
  );
};
