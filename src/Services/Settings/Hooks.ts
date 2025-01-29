import { AppRoutes } from '../Navigation/Routing';
import { formatRouteTemplate } from '../Navigation/Utils';
import { useServicesNavigation } from '../Services/Hooks';

export const useSettingsNavigation = () => {
  const { serviceId } = useServicesNavigation();

  const getSettingsGeneralRoute = () => formatRouteTemplate(AppRoutes.ServiceSettingsGeneral, { serviceId });

  return { getSettingsGeneralRoute };
};
