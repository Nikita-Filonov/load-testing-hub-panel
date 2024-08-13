import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { AppRoutes } from '../../Services/Constants/Routing';

type BaseRouterLinkProps = {
  to: AppRoutes;
} & PropsWithChildren;

export const BaseRouterLink: FC<BaseRouterLinkProps> = (props) => {
  const { to, children } = props;

  return (
    <Link component={RouterLink} to={to} underline="hover">
      {children}
    </Link>
  );
};
