import { Path, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../Constants/Routing';

type OnNavigateParams = Record<string, string | number> & Partial<Path>;

export const formatRouteTemplate = (route: string, params: OnNavigateParams): string => {
  let template = route;

  for (const [key, value] of Object.entries(params)) {
    template = template.replace(`:${key}`, value.toString());
  }

  return template;
};

export const useAppNavigationService = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  const onNavigate = (to: AppRoutes, params: OnNavigateParams = {}) => {
    const route = formatRouteTemplate(to, params);

    navigate({ pathname: route, ...params });
  };

  return { goBack, onNavigate };
};
