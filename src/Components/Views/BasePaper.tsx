import { Paper } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

type BasePaperProps = { sx?: SxProps<Theme> } & PropsWithChildren;

export const BasePaper: FC<BasePaperProps> = ({ children, sx }) => {
  return <Paper sx={{ p: 2, ...sx }}>{children}</Paper>;
};
