import { AppBar, Box } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { NavigationBreadcrumbs } from './NavigationBreadcrumbs';
import React, { FC, ReactNode } from 'react';
import { LogoImage } from '../Images/LogoImage';

type NavigationNavbarProps = {
  actions?: ReactNode;
};

export const NavigationNavbar: FC<NavigationNavbarProps> = ({ actions }) => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <LogoImage width={32} height={32} />
        <Typography variant="h6" noWrap component="div" sx={{ ml: 2, mr: 3 }}>
          Load testing metrics
        </Typography>
        <NavigationBreadcrumbs />
        <Box sx={{ flexGrow: 1 }} />
        {actions}
      </Toolbar>
    </AppBar>
  );
};
