import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { FC, PropsWithChildren } from 'react';
import { SxProps, Theme } from '@mui/material';

type BaseTreeViewProps = {
  sx?: SxProps<Theme>;
} & PropsWithChildren;

export const BaseTreeView: FC<BaseTreeViewProps> = ({ sx, children }) => {
  return <SimpleTreeView sx={sx}>{children}</SimpleTreeView>;
};
