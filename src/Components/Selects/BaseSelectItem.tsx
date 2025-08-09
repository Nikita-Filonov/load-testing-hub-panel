import { ListItem, ListItemText } from '@mui/material';
import { FC, ReactNode } from 'react';

type Props = {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  label?: ReactNode;
  action?: ReactNode;
};

export const BaseSelectItem: FC<Props> = (props) => {
  const { icon, title, subtitle, label, action } = props;

  return (
    <ListItem dense disableGutters disablePadding>
      {icon}
      <ListItemText sx={{ mr: 2 }} primary={title} secondary={subtitle} />
      {label}
      {action}
    </ListItem>
  );
};
