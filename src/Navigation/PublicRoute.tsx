import { FC } from 'react';
import { ProtectedRoute } from './ProtectedRoute';
import { AppRoutes } from '../Services/Constants/Routing';

type PublicRouteProps = {
  children?: JSX.Element;
};

export const PublicRoute: FC<PublicRouteProps> = ({ children }) => {
  return (
    <ProtectedRoute isAllowed={true} redirectPath={AppRoutes.Home}>
      {children}
    </ProtectedRoute>
  );
};
