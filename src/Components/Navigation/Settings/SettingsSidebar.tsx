import { NavigationSidebar } from '../NavigationSidebar';
import { Outlet } from 'react-router-dom';
import { DrawerListItem } from '../../ListItems/DrawerListItem';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CodeIcon from '@mui/icons-material/Code';
import { useServicesNavigation } from '../../../Services/Services/Hooks';
import { AppRoutes } from '../../../Services/Navigation/Routing';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { formatRouteTemplate } from '../../../Services/Navigation/Utils';

const ITEMS = [
  { title: 'General', icon: <CodeIcon />, route: AppRoutes.ServiceSettingsGeneral },
  { title: 'Compare weights', icon: <CompareArrowsIcon />, route: AppRoutes.ServiceSettingsCompareWeights },
  {
    title: 'Compare highlight threshold',
    icon: <ErrorOutlineIcon />,
    route: AppRoutes.ServiceSettingsCompareHighlightThreshold
  }
];

export const SettingsSidebar = () => {
  const { serviceId } = useServicesNavigation();

  return (
    <NavigationSidebar content={<Outlet />}>
      {ITEMS.map((item, index) => (
        <DrawerListItem
          key={index}
          title={item.title}
          to={formatRouteTemplate(item.route, { serviceId })}
          icon={item.icon}
        />
      ))}
    </NavigationSidebar>
  );
};
