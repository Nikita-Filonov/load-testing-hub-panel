import { Box, Paper, SxProps, Theme } from '@mui/material';
import Typography from '@mui/material/Typography';
import { FC, PropsWithChildren } from 'react';
import { LoadingView } from '../Views/LoadingView';

export type BaseChartViewProps = {
  title: string;
  loading?: boolean;
  childrenSx?: SxProps<Theme>;
  containerSx?: SxProps<Theme>;
} & PropsWithChildren;

export const BaseChartView: FC<BaseChartViewProps> = ({ title, loading, children, childrenSx, containerSx }) => {
  return (
    <Paper sx={{ width: '100%', height: 300, p: 2, mt: 3, ...containerSx }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ mr: 2 }} variant={'h6'}>
          {title}
        </Typography>
      </Box>
      {loading ? <LoadingView height={220} /> : <Box sx={{ height: '100%', ...childrenSx }}>{children}</Box>}
    </Paper>
  );
};
