import { Chip } from '@mui/material';
import { FC } from 'react';
import { BaseLabelProps } from './BaseLabel';

type BaseButtonLabelProps = {
  onClick: () => void;
} & BaseLabelProps;

export const BaseButtonLabel: FC<BaseButtonLabelProps> = (props) => {
  const { sx, icon, label, color, onClick } = props;

  return (
    <Chip
      sx={sx}
      size={'small'}
      icon={icon}
      color={color}
      label={label}
      component={'button'}
      clickable
      onClick={onClick}
    />
  );
};
