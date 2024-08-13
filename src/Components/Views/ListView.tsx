import { LoadingView } from './LoadingView';
import List from '@mui/material/List';
import { FC, PropsWithChildren } from 'react';

type ListViewProps = {
  loading: boolean;
} & PropsWithChildren;

export const ListView: FC<ListViewProps> = ({ loading, children }) => {
  return loading ? <LoadingView height={400} /> : <List sx={{ mt: 3 }}>{children}</List>;
};
