import { SettingsManager } from '../Config';
import { AppRoutes } from '../Constants/Routing';
import { getQueryString } from '../Clients/Utils';
import { formatRouteTemplate } from '../Navigation/Utils';

export const buildMethodURL = (method: string, serviceId: number): string => {
  const route = formatRouteTemplate(AppRoutes.ServiceMethodDetails, { serviceId });
  const query = getQueryString({ method });

  return `${SettingsManager.appUrl}${route}${query}`;
};
