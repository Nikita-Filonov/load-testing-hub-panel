import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { FC, ReactNode } from 'react';
import ListItemButton from '@mui/material/ListItemButton';

type BaseListMenuItemProps = {
  icon?: ReactNode;
  label: string;
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
  secondaryAction?: ReactNode;
};

export const BaseListMenuItem: FC<BaseListMenuItemProps> = ({ icon, label, onClick, disabled, secondaryAction }) => {
  return (
    <ListItem dense secondaryAction={secondaryAction} disablePadding>
      <ListItemButton onClick={onClick} disabled={disabled}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText sx={{ mr: 2 }}>{label}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
};
