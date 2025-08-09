import { SettingsManager } from '../Config';
import { AppRoutes } from '../Navigation/Routing';
import { getQueryString } from '../Clients/Utils';
import { formatRouteTemplate } from '../Navigation/Utils';
import { MethodsFilters } from '../../Components/Modals/Methods/MethodsFiltersModal';
import { getDefaultAnalyticsEndDatetime, getDefaultAnalyticsStartDatetime } from '../Analytics/Utils';

export const getMethodLabel = (method: string): string => method.split('/').at(-1) || method;

export const buildMethodURL = (method: string, serviceId: number): string => {
  const route = formatRouteTemplate(AppRoutes.ServiceMethodDetails, { serviceId });
  const query = getQueryString({ method });

  return `${SettingsManager.appUrl}${route}${query}`;
};

export const getDefaultMethodsFilters = (): MethodsFilters => ({
  method: null,
  protocol: null,
  endDatetime: getDefaultAnalyticsEndDatetime(),
  startDatetime: getDefaultAnalyticsStartDatetime()
});
