import Box from '@mui/material/Box';
import { FC, ReactNode } from 'react';
import { StyledDrawer } from './StyledDrawer';
import Toolbar from '@mui/material/Toolbar';
import { Outlet } from 'react-router-dom';

type NavigationDrawerProps = {
  navbar: ReactNode;
  children?: ReactNode;
};

export const NavigationDrawer: FC<NavigationDrawerProps> = ({ navbar, children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {navbar}
      {children && (
        <StyledDrawer variant={'permanent'}>
          <Toolbar sx={{ mb: 1 }} />
          {children}
        </StyledDrawer>
      )}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};
