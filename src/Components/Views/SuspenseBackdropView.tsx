import { Backdrop, CircularProgress } from '@mui/material';

export const SuspenseBackdropView = () => (
  <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
    <CircularProgress color="inherit" />
  </Backdrop>
);
