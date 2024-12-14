import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import React, { useMemo } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { matchRouteDefinitions } from '../../Services/Navigation/Matcher';
import { ROUTE_PATH_DEFINITIONS } from '../../Services/Navigation/Definitions';

export const NavigationBreadcrumbs = () => {
  const { pathname } = useLocation();

  const breadcrumbs = useMemo(
    () => matchRouteDefinitions({ definitions: ROUTE_PATH_DEFINITIONS, pathname }),
    [pathname]
  );

  return (
    <Breadcrumbs maxItems={2} separator={<NavigateNextIcon fontSize="small" style={{ color: '#FFFFFF' }} />}>
      {breadcrumbs.map(({ pathname, title }, index) => (
        <Link style={{ color: '#FFFFFF', fontSize: 16 }} key={index} to={pathname} component={RouterLink}>
          {title}
        </Link>
      ))}
    </Breadcrumbs>
  );
};
