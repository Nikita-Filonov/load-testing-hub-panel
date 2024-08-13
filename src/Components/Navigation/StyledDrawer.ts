import { styled } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';

export const DRAWER_WIDTH = 250;

export const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(() => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  [`& .MuiDrawer-paper`]: { width: DRAWER_WIDTH, boxSizing: 'border-box' }
}));
