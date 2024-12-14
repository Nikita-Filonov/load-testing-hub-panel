import { AppRoutes } from '../../../Services/Constants/Routing';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import WebhookIcon from '@mui/icons-material/Webhook';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import { useServicesNavigation } from '../../../Services/Services/Hooks';
import { formatRouteTemplate } from '../../../Services/Navigation/Utils';
import { NavigationDrawer } from '../NavigationDrawer';
import { DrawerListItem } from '../../ListItems/DrawerListItem';
import { ServicesNavbar } from './ServicesNavbar';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const ITEMS = [
  { title: 'Dashboard', icon: <SpaceDashboardOutlinedIcon />, route: AppRoutes.ServiceDashboard },
  { title: 'Results', icon: <FormatListBulletedIcon />, route: AppRoutes.ServiceResults },
  { title: 'Methods', icon: <WebhookIcon />, route: AppRoutes.ServiceMethods },
  { title: 'Scenarios', icon: <HandymanOutlinedIcon />, route: AppRoutes.ServiceScenarios },
  { title: 'Compares', icon: <CompareArrowsIcon />, route: AppRoutes.ServiceCompares }
];

export const ServicesDrawer = () => {
  const { serviceId } = useServicesNavigation();

  return (
    <NavigationDrawer navbar={<ServicesNavbar />}>
      {ITEMS.map((item, index) => (
        <DrawerListItem
          key={index}
          title={item.title}
          to={formatRouteTemplate(item.route, { serviceId })}
          icon={item.icon}
        />
      ))}
    </NavigationDrawer>
  );
};
