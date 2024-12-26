import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import React, { FC, ReactNode } from 'react';

type BaseMenuItemProps = {
  icon?: React.ReactNode;
  title: string;
  label?: ReactNode;
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
};

export const BaseMenuItem: FC<BaseMenuItemProps> = ({ icon, title, label, onClick, disabled }) => {
  return (
    <MenuItem onClick={onClick} disabled={disabled}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText>{title}</ListItemText>
      {label}
    </MenuItem>
  );
};
