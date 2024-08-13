import { DRAWER_ITEMS } from '../../Services/Constants/DrawerItems';
import { DrawerListItem } from '../ListItems/DrawerListItem';
import List from '@mui/material/List';
import * as React from 'react';
import { AppRoutes } from '../../Services/Constants/Routing';
import { useLocation } from 'react-router-dom';
import { useAppNavigationService } from '../../Services/HookServices/AppNavigationServiceHook';

export const NavigationDrawerItems = () => {
  const { pathname } = useLocation();
  const { onNavigate: onAppNavigate } = useAppNavigationService();

  const onNavigate = (route: AppRoutes) => () => {
    onAppNavigate(route);
  };

  return (
    <List sx={{ mb: 7 }}>
      {DRAWER_ITEMS.map(({ title, icon, route }, index) => (
        <DrawerListItem
          key={index}
          icon={icon}
          title={title}
          onClick={onNavigate(route)}
          selected={pathname.startsWith(route)}
        />
      ))}
    </List>
  );
};
