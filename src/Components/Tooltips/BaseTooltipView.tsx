import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FC, PropsWithChildren } from 'react';

type BaseTooltipViewProps = {
  title: string;
} & PropsWithChildren;

export const BaseTooltipView: FC<BaseTooltipViewProps> = ({ title, children }) => {
  return (
    <Box sx={{ p: 1 }}>
      <Typography variant={'h6'}>{title}</Typography>
      {children}
    </Box>
  );
};
