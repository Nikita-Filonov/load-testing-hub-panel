import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AppRoutes } from '../Services/Constants/Routing';

type ProtectedRouteProps = {
  children?: JSX.Element;
  isAllowed: boolean;
  redirectPath?: string;
  redirectState?: Record<string, string>;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = (props) => {
  const { children, isAllowed, redirectPath = AppRoutes.Dashboard, redirectState } = props;

  if (!isAllowed) {
    return <Navigate to={redirectPath} replace state={redirectState} />;
  }

  return children ? children : <Outlet />;
};
