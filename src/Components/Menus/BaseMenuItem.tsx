import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import React, { FC } from 'react';

type BaseMenuItemProps = {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
};

export const BaseMenuItem: FC<BaseMenuItemProps> = ({ icon, label, onClick, disabled }) => {
  return (
    <MenuItem onClick={onClick} disabled={disabled}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText>{label}</ListItemText>
    </MenuItem>
  );
};
