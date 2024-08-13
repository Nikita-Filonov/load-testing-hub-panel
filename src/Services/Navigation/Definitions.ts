import { PathMatch } from 'react-router-dom';
import { AppRoutes } from '../Constants/Routing';

export type RoutePathDefinition = {
  title: string;
  getTitle?: (match: PathMatch) => string;
  children?: RoutePathDefinition[];
  path: string;
};

export const ROUTE_PATH_DEFINITIONS: RoutePathDefinition[] = [
  { title: 'Home', path: AppRoutes.Home },
  { title: 'Dashboard', path: AppRoutes.Dashboard },
  {
    title: 'Results',
    path: AppRoutes.Results,
    children: [
      { title: 'Result details', path: AppRoutes.ResultDetails },
      {
        title: 'Compare with scenario SLA',
        path: AppRoutes.ResultCompareWithScenario
      },
      {
        title: 'Compare with actual data',
        path: AppRoutes.ResultCompareWithActualData
      }
    ]
  },
  {
    title: 'Methods',
    path: AppRoutes.Methods,
    children: [{ title: 'Method details', path: AppRoutes.MethodsDetails }]
  },
  { title: 'Scenarios', path: AppRoutes.Scenarios }
];
