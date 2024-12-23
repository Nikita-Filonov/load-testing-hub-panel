import { LoadingView } from './LoadingView';
import List from '@mui/material/List';
import { FC, PropsWithChildren } from 'react';
import { SxProps, Theme } from '@mui/material';

type ListViewProps = {
  dense?: boolean;
  loading: boolean;
  containerSx?: SxProps<Theme>;
} & PropsWithChildren;

export const ListView: FC<ListViewProps> = ({ dense, loading, children, containerSx }) => {
  return loading ? (
    <LoadingView height={400} />
  ) : (
    <List sx={{ mt: 3, ...containerSx }} dense={dense}>
      {children}
    </List>
  );
};
