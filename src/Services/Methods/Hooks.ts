import { useSearchParams, To } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { AppRoutes } from '../Navigation/Routing';
import { useAppNavigation } from '../Navigation/Hooks';
import { useServicesNavigation } from '../Services/Hooks';
import { getQueryString } from '../Clients/Utils';
import { buildMethodURL } from './Utils';
import { formatRouteTemplate } from '../Navigation/Utils';

export const useMethodsNavigation = () => {
  const { onNavigate } = useAppNavigation();
  const { serviceId } = useServicesNavigation();

  const getMethodURL = (method: string) => buildMethodURL(method, serviceId);

  const getMethodRoute = (method: string): To => {
    const route = formatRouteTemplate(AppRoutes.ServiceMethodDetails, { serviceId });
    const query = getQueryString({ method });

    return { pathname: route, search: query };
  };

  const navigateMethodDetails = (method: string) => {
    onNavigate(AppRoutes.ServiceMethodDetails, { serviceId, search: getQueryString({ method }) });
  };

  return { getMethodURL, getMethodRoute, navigateMethodDetails };
};

export const useMethodDetailsNavigation = () => {
  const { onNavigate } = useAppNavigation();
  const { serviceId } = useServicesNavigation();
  const [searchParams] = useSearchParams();

  const method = useMemo(() => searchParams.get('method'), [searchParams]);

  useEffect(() => {
    if (!method) {
      onNavigate(AppRoutes.ServiceMethods, { serviceId });
    }
  }, [method]);

  return { method };
};
