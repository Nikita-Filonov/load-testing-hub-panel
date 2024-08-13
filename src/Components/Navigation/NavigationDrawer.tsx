import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import { FC } from 'react';
import { NavigationNavbar } from './NavigationNavbar';
import { StyledDrawerHeader } from './StyledDrawerHeader';
import { NavigationDrawerItems } from './NavigationDrawerItems';
import { StyledDrawer } from './StyledDrawer';

type NavigationDrawerProps = {
  children: React.ReactNode;
};

export const NavigationDrawer: FC<NavigationDrawerProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex' }}>
      <NavigationNavbar />
      <StyledDrawer variant={'permanent'}>
        <StyledDrawerHeader>
          <IconButton>{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}</IconButton>
        </StyledDrawerHeader>
        <NavigationDrawerItems />
      </StyledDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <StyledDrawerHeader />
        {children}
      </Box>
    </Box>
  );
};
