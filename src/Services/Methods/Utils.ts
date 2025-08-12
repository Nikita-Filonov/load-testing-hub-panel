import { SettingsManager } from '../Config';
import { AppRoutes } from '../Navigation/Routing';
import { getQueryString } from '../Clients/Utils';
import { formatRouteTemplate } from '../Navigation/Utils';
import { MethodsFilters } from '../../Components/Modals/Methods/MethodsFiltersModal';
import { getDefaultAnalyticsEndDatetime, getDefaultAnalyticsStartDatetime } from '../Analytics/Utils';
import { ProtocolType } from '../../Models/Results/MethodResults';

type GetMethodLabelParams = {
  method: string;
  protocol: ProtocolType;
};

type BuildMethodURLParams = {
  method: string;
  protocol: ProtocolType;
  serviceId: number;
};

export const getMethodLabel = ({ method, protocol }: GetMethodLabelParams): string => {
  switch (protocol) {
    case ProtocolType.HTTP:
      return method;
    case ProtocolType.GRPC:
      return method.split('/').at(-1) || method;
    case ProtocolType.KAFKA:
      return method;
    default:
      return method;
  }
};

export const buildMethodURL = ({ method, protocol, serviceId }: BuildMethodURLParams): string => {
  const route = formatRouteTemplate(AppRoutes.ServiceMethodDetails, { serviceId });
  const query = getQueryString({ method, protocol });

  return `${SettingsManager.appUrl}${route}${query}`;
};

export const getDefaultMethodsFilters = (): MethodsFilters => ({
  method: null,
  protocol: null,
  endDatetime: getDefaultAnalyticsEndDatetime(),
  startDatetime: getDefaultAnalyticsStartDatetime()
});
