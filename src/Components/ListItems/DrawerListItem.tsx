import { ListItem } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React, { FC } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

export type DrawerListItemProps = {
  to: string;
  icon: React.ReactNode;
  title: string;
};

export const DrawerListItem: FC<DrawerListItemProps> = (props) => {
  const { to, icon, title } = props;
  const location = useLocation();

  return (
    <ListItem disableGutters>
      <ListItemButton component={RouterLink} to={to} selected={location.pathname.startsWith(to)}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  );
};
