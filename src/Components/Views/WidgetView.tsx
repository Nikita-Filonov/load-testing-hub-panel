import { BasePaper } from './BasePaper';
import { Grid2, IconButton, Paper, SxProps, Theme, Typography } from '@mui/material';
import { FC, PropsWithChildren, ReactNode, useState } from 'react';
import { LoadingView } from './LoadingView';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { getActionMarginRight } from '../../Services/Views/Utils';

type WidgetAction = {
  icon?: ReactNode;
  onClick?: () => void;
  content?: ReactNode;
};

export type WidgetViewProps = {
  sx?: SxProps<Theme>;
  flat?: boolean;
  title?: string | ReactNode;
  label?: ReactNode;
  height?: number;
  actions?: WidgetAction[];
  loading?: boolean;
  children?: ReactNode;
  childrenSx?: SxProps<Theme>;
  allowClose?: boolean;
  defaultClose?: boolean;
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
  const {
    sx,
    flat = false,
    title,
    label,
    height = 300,
    actions,
    loading,
    children,
    childrenSx,
    allowClose,
    defaultClose = false
  } = props;
  const [widgetHidden, setWidgetHidden] = useState(defaultClose);

  const onHide = () => setWidgetHidden(!widgetHidden);

  const getMarginRight = (index: number): number => {
    return allowClose ? 1 : getActionMarginRight({ index, actions, margin: 1 });
  };

  return (
    <Container sx={sx} flat={flat}>
      <Grid2 container spacing={1} display={'flex'} alignItems={'center'}>
        <Grid2>
          <Typography variant={'h6'}>{title}</Typography>
        </Grid2>
        <Grid2>{label}</Grid2>
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
          {allowClose && (
            <IconButton size={'small'} onClick={onHide}>
              {widgetHidden ? <AddIcon fontSize={'small'} /> : <CloseIcon fontSize={'small'} />}
            </IconButton>
          )}
        </Grid2>
      </Grid2>
      {widgetHidden ? null : loading ? <LoadingView height={height} /> : <Box sx={childrenSx}>{children}</Box>}
    </Container>
  );
};
