import { DrawerListItemProps } from '../../Components/ListItems/DrawerListItem';
import { AppRoutes } from './Routing';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import HomeIcon from '@mui/icons-material/Home';
import WebhookIcon from '@mui/icons-material/Webhook';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';

type DrawerItem = { route: AppRoutes } & Omit<DrawerListItemProps, 'open'>;

export const DRAWER_ITEMS: DrawerItem[] = [
  { icon: <HomeIcon />, title: 'Home', route: AppRoutes.Home },
  { icon: <SpaceDashboardOutlinedIcon />, title: 'Dashboard', route: AppRoutes.Dashboard },
  { icon: <FormatListBulletedIcon />, title: 'Results', route: AppRoutes.Results },
  { icon: <WebhookIcon />, title: 'Methods', route: AppRoutes.Methods },
  { icon: <HandymanOutlinedIcon />, title: 'Scenarios', route: AppRoutes.Scenarios }
];
