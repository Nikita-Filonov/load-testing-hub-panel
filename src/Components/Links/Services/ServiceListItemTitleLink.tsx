import { BaseRouterLink } from '../BaseRouterLink';
import { Service } from '../../../Models/Services/Services';
import { FC } from 'react';
import { getServiceTitle } from '../../../Services/Services/Utils';
import { useLoadTestResultsNavigation } from '../../../Services/Results/Hooks';

type ServiceListItemTitleLinkProps = {
  service: Service;
};

export const ServiceListItemTitleLink: FC<ServiceListItemTitleLinkProps> = ({ service }) => {
  const { getResultsRoute } = useLoadTestResultsNavigation();

  return <BaseRouterLink to={getResultsRoute(service.id)}>{getServiceTitle(service)}</BaseRouterLink>;
};
