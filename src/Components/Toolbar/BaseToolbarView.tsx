import { BasePaper } from '../Views/BasePaper';
import Typography from '@mui/material/Typography';
import { Badge, Box, CircularProgress, SxProps, Theme } from '@mui/material';
import { FC, ReactNode } from 'react';
import IconButton from '@mui/material/IconButton';
import { getActionMarginRight } from '../../Services/Views/Utils';

export type ToolbarAction = {
  icon?: ReactNode;
  content?: ReactNode;
  loading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  badgeContent?: ReactNode;
};

type BaseToolbarViewProps = {
  title: string;
  actions?: ToolbarAction[];
  containerSx?: SxProps<Theme>;
};

export const BaseToolbarView: FC<BaseToolbarViewProps> = (props) => {
  const { title, actions = [], containerSx } = props;

  const getMarginRight = (index: number): number => getActionMarginRight({ index, actions, margin: 2 });

  return (
    <BasePaper sx={containerSx}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant={'h6'}>{title}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        {actions.map((action, index) =>
          action.icon ? (
            <IconButton
              key={index}
              sx={{ mr: getMarginRight(index) }}
              onClick={action.onClick}
              disabled={action.disabled}>
              <Badge badgeContent={action.badgeContent} color="primary">
                {action.loading ? <CircularProgress size={24} /> : action.icon}
              </Badge>
            </IconButton>
          ) : (
            <Box key={index} sx={{ mr: getMarginRight(index) }}>
              {action.content}
            </Box>
          )
        )}
      </Box>
    </BasePaper>
  );
};
