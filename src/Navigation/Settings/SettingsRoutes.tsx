import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ServicesDrawer } from '../../Components/Navigation/Services/ServicesDrawer';
import { SettingsSidebar } from '../../Components/Navigation/Settings/SettingsSidebar';
import { useSettingsNavigation } from '../../Services/Settings/Hooks';

const ServiceSettingsPage = lazy(() => import('../../Pages/Settings/ServiceSettingsPage'));
const CompareWeightsSettingsPage = lazy(() => import('../../Pages/Settings/CompareWeightsSettingsPage'));
const CompareHighlightThresholdSettingsPage = lazy(
  () => import('../../Pages/Settings/CompareHighlightThresholdSettingsPage')
);

export const SettingsRoutes = () => {
  const { getSettingsGeneralRoute } = useSettingsNavigation();

  return (
    <Routes>
      <Route element={<ServicesDrawer />}>
        <Route element={<SettingsSidebar />}>
          <Route index element={<Navigate to={getSettingsGeneralRoute()} />} />
          <Route path={'/general'} element={<ServiceSettingsPage />} />
          <Route path={'/compare-weights'} element={<CompareWeightsSettingsPage />} />
          <Route path={'/compare-highlight-threshold'} element={<CompareHighlightThresholdSettingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
