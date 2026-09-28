import Typography from '@mui/material/Typography';
import { LoadingView } from './LoadingView';
import Box from '@mui/material/Box';
import { FC, PropsWithChildren, ReactNode } from 'react';
import { Grid, IconButton, SxProps, Theme } from '@mui/material';

type BoxAction = {
  icon?: ReactNode;
  onClick?: () => void;
};

type BoxViewProps = {
  title?: string;
  label?: ReactNode;
  actions?: BoxAction[];
  loading?: boolean;
  containerSx?: SxProps<Theme>;
} & PropsWithChildren;

export const BoxView: FC<BoxViewProps> = (props) => {
  const { title, label, actions, loading, children, containerSx } = props;

  return (
    <Box sx={{ mt: 3, ...containerSx }}>
      <Grid container spacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
        {title && (
          <Grid>
            <Typography sx={{ fontWeight: 'bold' }}>{title}</Typography>
          </Grid>
        )}
        {label && <Grid>{label}</Grid>}
        <Grid sx={{ ml: 'auto', display: 'flex', alignItems: 'flex-end' }}>
          {actions?.map((action, index) => (
            <IconButton
              size={'small'}
              key={index}
              sx={{ mr: actions.length === index + 1 ? 0 : 2 }}
              onClick={action.onClick}>
              {action.icon}
            </IconButton>
          ))}
        </Grid>
      </Grid>
      {loading ? <LoadingView height={300} /> : children}
    </Box>
  );
};
