import { Path } from 'react-router-dom';

export type OnNavigateParams = Record<string, string | number> & Partial<Path>;

export const formatRouteTemplate = (route: string, params: OnNavigateParams): string => {
  let template = route;

  for (const [key, value] of Object.entries(params)) {
    template = template.replace(`:${key}`, value.toString());
  }

  return template;
};
