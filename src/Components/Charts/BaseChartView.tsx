import { Box, Grid2, IconButton, Paper, SxProps, Theme } from '@mui/material';
import Typography from '@mui/material/Typography';
import { FC, PropsWithChildren, ReactNode } from 'react';
import { LoadingView } from '../Views/LoadingView';
import { getActionMarginRight } from '../../Services/Views/Utils';

type ChartAction = {
  icon?: ReactNode;
  onClick?: () => void;
  content?: ReactNode;
};

export type BaseChartViewProps = {
  title: string;
  loading?: boolean;
  actions?: ChartAction[];
  childrenSx?: SxProps<Theme>;
  containerSx?: SxProps<Theme>;
} & PropsWithChildren;

export const BaseChartView: FC<BaseChartViewProps> = (props) => {
  const { title, loading, actions, children, childrenSx, containerSx } = props;

  const getMarginRight = (index: number): number => getActionMarginRight({ index, actions, margin: 1 });

  return (
    <Paper sx={{ width: '100%', height: '100%', p: 2, mt: 3, ...containerSx }}>
      <Grid2 container spacing={1} display={'flex'} alignItems={'center'}>
        <Grid2>
          <Typography variant={'h6'}>{title}</Typography>
        </Grid2>
        <Grid2 sx={{ ml: 'auto', display: 'flex', alignItems: 'flex-end' }}>
          {actions?.map((action, index) =>
            action.icon ? (
              <IconButton key={index} sx={{ mr: getMarginRight(index) }} size={'small'} onClick={action.onClick}>
                {action.icon}
              </IconButton>
            ) : (
              <Box key={index} sx={{ mr: getMarginRight(index) }}>
                {action.content}
              </Box>
            )
          )}
        </Grid2>
      </Grid2>
      {loading ? <LoadingView height={300} /> : <Box sx={{ height: '100%', ...childrenSx }}>{children}</Box>}
    </Paper>
  );
};
