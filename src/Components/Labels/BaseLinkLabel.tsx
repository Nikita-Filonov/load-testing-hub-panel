import { Chip } from '@mui/material';
import { FC } from 'react';
import { BaseLabelProps } from './BaseLabel';

type BaseLinkLabelProps = {
  url: string;
} & BaseLabelProps;

export const BaseLinkLabel: FC<BaseLinkLabelProps> = (props) => {
  const { sx, url, icon, label, color } = props;

  return (
    <Chip
      sx={sx}
      href={url}
      size={'small'}
      icon={icon}
      color={color}
      label={label}
      component={'a'}
      target={'_blank'}
      clickable
    />
  );
};
