import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ServicesDrawer } from '../../Components/Navigation/Services/ServicesDrawer';

const ComparesPage = lazy(() => import('../../Pages/Compares/ComparesPage'));

export const ComparesRoutes = () => {
  return (
    <Routes>
      <Route element={<ServicesDrawer />}>
        <Route index element={<ComparesPage />} />
      </Route>
    </Routes>
  );
};
