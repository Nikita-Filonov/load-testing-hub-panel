import { FC } from 'react';
import { Box, CircularProgress } from '@mui/material';

type LoadingViewProps = {
  height: number;
};

export const LoadingView: FC<LoadingViewProps> = ({ height }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height }}>
      <CircularProgress />
    </Box>
  );
};
