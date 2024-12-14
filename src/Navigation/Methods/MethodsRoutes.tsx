import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ServicesDrawer } from '../../Components/Navigation/Services/ServicesDrawer';

const MethodsPage = lazy(() => import('../../Pages/Methods/MethodsPage'));
const MethodDetailsPage = lazy(() => import('../../Pages/Methods/MethodDetailsPage'));

export const MethodsRoutes = () => {
  return (
    <Routes>
      <Route element={<ServicesDrawer />}>
        <Route index element={<MethodsPage />} />
        <Route path={'/details'} element={<MethodDetailsPage />} />
      </Route>
    </Routes>
  );
};
