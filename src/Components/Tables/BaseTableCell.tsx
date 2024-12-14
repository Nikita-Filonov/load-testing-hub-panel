import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FC, ReactNode } from 'react';

type BaseTableCellProps = {
  text: string;
  icon?: ReactNode;
};

export const BaseTableCell: FC<BaseTableCellProps> = ({ text, icon }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant={'body2'}>{text}</Typography>
      {icon}
    </Box>
  );
};
