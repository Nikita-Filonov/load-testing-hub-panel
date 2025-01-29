import { useNavigate } from 'react-router-dom';
import { AppRoutes } from './Routing';
import { formatRouteTemplate, OnNavigateParams } from './Utils';

export const useAppNavigation = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  const onNavigate = (to: AppRoutes, params: OnNavigateParams = {}) => {
    const route = formatRouteTemplate(to, params);

    navigate({ pathname: route, ...params });
  };

  return { goBack, onNavigate };
};
