import { useSearchParams, To } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { AppRoutes } from '../Navigation/Routing';
import { useAppNavigation } from '../Navigation/Hooks';
import { useServicesNavigation } from '../Services/Hooks';
import { getQueryString } from '../Clients/Utils';
import { buildMethodURL } from './Utils';
import { formatRouteTemplate } from '../Navigation/Utils';
import { ProtocolType } from '../../Models/Results/MethodResults';

type GetMethodURLParams = {
  method: string;
  protocol: ProtocolType;
};

type GetMethodRouteParams = GetMethodURLParams;

type NavigateMethodDetailsParams = GetMethodURLParams;

export const useMethodsNavigation = () => {
  const { onNavigate } = useAppNavigation();
  const { serviceId } = useServicesNavigation();

  const getMethodURL = (props: GetMethodURLParams) => buildMethodURL({ ...props, serviceId });

  const getMethodRoute = (props: GetMethodRouteParams): To => {
    const route = formatRouteTemplate(AppRoutes.ServiceMethodDetails, { serviceId });
    const query = getQueryString(props);

    return { pathname: route, search: query };
  };

  const navigateMethodDetails = (props: NavigateMethodDetailsParams) => {
    onNavigate(AppRoutes.ServiceMethodDetails, { serviceId, search: getQueryString(props) });
  };

  return { getMethodURL, getMethodRoute, navigateMethodDetails };
};

export const useMethodDetailsNavigation = () => {
  const { onNavigate } = useAppNavigation();
  const { serviceId } = useServicesNavigation();
  const [searchParams] = useSearchParams();

  const method = useMemo(() => searchParams.get('method'), [searchParams]);
  const protocol = useMemo(() => searchParams.get('protocol') as ProtocolType | null, [searchParams]);

  useEffect(() => {
    if (!method || !protocol) {
      onNavigate(AppRoutes.ServiceMethods, { serviceId });
    }
  }, [method, protocol]);

  return { method, protocol };
};
