import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { matchRouteDefinitions } from '../../Services/Navigation/Matcher';
import { ROUTE_PATH_DEFINITIONS } from '../../Services/Navigation/Definitions';
import { useAppNavigationService } from '../../Services/HookServices/AppNavigationServiceHook';
import { AppRoutes } from '../../Services/Constants/Routing';

export const NavigationBreadcrumbs = () => {
  const { pathname } = useLocation();
  const { onNavigate } = useAppNavigationService();

  const breadcrumbs = useMemo(
    () => matchRouteDefinitions({ definitions: ROUTE_PATH_DEFINITIONS, pathname }),
    [pathname]
  );

  const onLink = (route: AppRoutes) => (event: React.SyntheticEvent) => {
    event.preventDefault();
    onNavigate(route);
  };

  return (
    <Breadcrumbs maxItems={2} separator={<NavigateNextIcon fontSize="small" style={{ color: '#FFFFFF' }} />}>
      {breadcrumbs.map(({ pathname, title }, index) => (
        <Link
          style={{ color: '#FFFFFF', fontSize: 16 }}
          key={index}
          href={pathname}
          onClick={onLink(pathname as AppRoutes)}>
          {title}
        </Link>
      ))}
    </Breadcrumbs>
  );
};
