import Typography from '@mui/material/Typography';
import { LoadingView } from './LoadingView';
import Box from '@mui/material/Box';
import { FC, PropsWithChildren, ReactNode } from 'react';
import { Grid2, IconButton, SxProps, Theme } from '@mui/material';

type BoxAction = {
  icon?: ReactNode;
  onClick?: () => void;
};

type BoxViewProps = {
  title?: string;
  actions?: BoxAction[];
  loading?: boolean;
  containerSx?: SxProps<Theme>;
} & PropsWithChildren;

export const BoxView: FC<BoxViewProps> = (props) => {
  const { title, actions, loading, children, containerSx } = props;

  return (
    <Box sx={{ mt: 3, ...containerSx }}>
      <Grid2 container display={'flex'}>
        {title && (
          <Grid2>
            <Typography fontWeight={'bold'}>{title}</Typography>
          </Grid2>
        )}
        <Grid2 sx={{ ml: 'auto', display: 'flex', alignItems: 'flex-end' }}>
          {actions?.map((action, index) => (
            <IconButton
              size={'small'}
              key={index}
              sx={{ mr: actions.length === index + 1 ? 0 : 2 }}
              onClick={action.onClick}>
              {action.icon}
            </IconButton>
          ))}
        </Grid2>
      </Grid2>
      {loading ? <LoadingView height={300} /> : children}
    </Box>
  );
};
