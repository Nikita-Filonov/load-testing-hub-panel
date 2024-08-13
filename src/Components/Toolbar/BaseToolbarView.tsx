import { BasePaper } from '../Views/BasePaper';
import Typography from '@mui/material/Typography';
import { Badge, Box, SxProps, Theme } from '@mui/material';
import { FC, ReactNode } from 'react';
import IconButton from '@mui/material/IconButton';

type ToolbarAction = {
  icon?: ReactNode;
  content?: ReactNode;
  onClick?: () => void;
  badgeContent?: ReactNode;
};

type BaseToolbarViewProps = {
  title: string;
  actions?: ToolbarAction[];
  containerSx?: SxProps<Theme>;
};

export const BaseToolbarView: FC<BaseToolbarViewProps> = (props) => {
  const { title, actions = [], containerSx } = props;

  return (
    <BasePaper sx={containerSx}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant={'h6'}>{title}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        {actions.map((action, index) =>
          action.icon ? (
            <IconButton key={index} sx={{ mr: actions.length === index + 1 ? 0 : 2 }} onClick={action.onClick}>
              <Badge badgeContent={action.badgeContent} color="primary">
                {action.icon}
              </Badge>
            </IconButton>
          ) : (
            <Box key={index} sx={{ mr: actions.length === index + 1 ? 0 : 2 }}>
              {action.content}
            </Box>
          )
        )}
      </Box>
    </BasePaper>
  );
};
