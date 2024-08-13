import { BasePaper } from './BasePaper';
import Typography from '@mui/material/Typography';
import { FC, PropsWithChildren, ReactNode } from 'react';
import { LoadingView } from './LoadingView';
import { Grid, Paper, SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';

type WidgetViewProps = {
  sx?: SxProps<Theme>;
  flat?: boolean;
  title?: string | ReactNode;
  label?: ReactNode;
  height?: number;
  loading?: boolean;
  children?: ReactNode;
  childrenSx?: SxProps<Theme>;
};

type ContainerProps = {
  sx?: SxProps<Theme>;
  flat: boolean;
} & PropsWithChildren;

const Container: FC<ContainerProps> = (props) => {
  const { sx, flat, children } = props;

  return flat ? (
    <Paper sx={{ ...sx, bgcolor: 'inherit' }} elevation={0}>
      {children}
    </Paper>
  ) : (
    <BasePaper sx={sx}>{children}</BasePaper>
  );
};

export const WidgetView: FC<WidgetViewProps> = (props) => {
  const { sx, flat = false, title, label, height = 300, loading, children, childrenSx } = props;

  return (
    <Container sx={sx} flat={flat}>
      <Grid container spacing={1} display={'flex'} alignItems={'center'}>
        <Grid item>
          <Typography variant={'h6'}>{title}</Typography>
        </Grid>
        <Grid item>{label}</Grid>
      </Grid>
      {loading ? <LoadingView height={height} /> : <Box sx={childrenSx}>{children}</Box>}
    </Container>
  );
};
