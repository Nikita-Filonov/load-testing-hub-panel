import { Button, Card, CardActions, CardContent } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

type CardAction = {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
};

type BaseCardProps = {
  actions: CardAction[];
} & PropsWithChildren;

export const BaseCard: FC<BaseCardProps> = ({ children, actions }) => {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>{children}</CardContent>
      <CardActions>
        {actions.map((action, index) => (
          <Button key={index} variant={'outlined'} size="small" disabled={action.disabled} onClick={action.onClick}>
            {action.title}
          </Button>
        ))}
      </CardActions>
    </Card>
  );
};
