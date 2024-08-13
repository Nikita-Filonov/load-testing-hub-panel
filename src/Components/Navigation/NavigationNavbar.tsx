import { Box } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { NavigationBreadcrumbs } from './NavigationBreadcrumbs';
import { NavigationNavbarActions } from './NavigationNavbarActions';
import { StyledAppBar } from './StyledAppBar';
import React from 'react';
import { LogoImage } from '../Images/LogoImage';

export const NavigationNavbar = () => {
  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <LogoImage width={32} height={32} />
        <Typography variant="h6" noWrap component="div" sx={{ ml: 2, mr: 3 }}>
          Load testing hub
        </Typography>
        <NavigationBreadcrumbs />
        <Box sx={{ flexGrow: 1 }} />
        <NavigationNavbarActions />
      </Toolbar>
    </StyledAppBar>
  );
};
