import { PathMatch } from 'react-router-dom';
import { AppRoutes } from '../Constants/Routing';

export type RoutePathDefinition = {
  title: string;
  getTitle?: (match: PathMatch) => string;
  children?: RoutePathDefinition[];
  path: string;
};

export const ROUTE_PATH_DEFINITIONS: RoutePathDefinition[] = [
  {
    title: 'Services',
    path: AppRoutes.Services,
    children: [
      {
        title: 'Results',
        path: AppRoutes.ServiceResults,
        children: [
          { title: 'Result details', path: AppRoutes.ServiceResultDetails },
          { title: 'Compare with results', path: AppRoutes.ServiceCompareResultWithResults },
          { title: 'Compare with averages', path: AppRoutes.ServiceCompareResultWithAverages },
          { title: 'Compare with scenario', path: AppRoutes.ServiceCompareResultWithScenario }
        ]
      },
      {
        title: 'Methods',
        path: AppRoutes.ServiceMethods,
        children: [{ title: 'Method details', path: AppRoutes.ServiceMethodDetails }]
      },
      { title: 'Dashboard', path: AppRoutes.ServiceDashboard },
      { title: 'Scenarios', path: AppRoutes.ServiceScenarios },
      {
        title: 'Settings',
        path: AppRoutes.ServiceSettings,
        children: [
          { title: 'Compare weights', path: AppRoutes.ServiceSettingsCompareWeights },
          { title: 'Compare highlight threshold', path: AppRoutes.ServiceSettingsCompareHighlightThreshold }
        ]
      }
    ]
  }
];
