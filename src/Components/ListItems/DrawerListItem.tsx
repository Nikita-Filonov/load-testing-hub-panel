import { Tooltip, useTheme } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React, { FC } from 'react';

export type DrawerListItemProps = {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
  selected?: boolean;
};

export const DrawerListItem: FC<DrawerListItemProps> = (props) => {
  const { icon, title, onClick, selected } = props;
  const { palette } = useTheme();

  return (
    <Tooltip title={title} arrow placement="right">
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: 'initial',
          px: 2.5,
          backgroundColor: selected ? palette.action.selected : 'unset'
        }}
        onClick={onClick}>
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: 3,
            justifyContent: 'center'
          }}>
          {icon}
        </ListItemIcon>
        <ListItemText primary={title} sx={{ opacity: 1 }} />
      </ListItemButton>
    </Tooltip>
  );
};
