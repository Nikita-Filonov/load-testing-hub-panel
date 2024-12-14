import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainDrawer } from '../../Components/Navigation/Main/MainDrawer';
import { ServicesRoutesEffect } from './ServicesRoutesEffect';

const ServicesPage = lazy(() => import('../../Pages/Services/ServicesPage'));

export const ServicesRoutes = () => {
  return (
    <ServicesRoutesEffect>
      <Routes>
        <Route element={<MainDrawer />}>
          <Route index element={<ServicesPage />} />
        </Route>
      </Routes>
    </ServicesRoutesEffect>
  );
};
