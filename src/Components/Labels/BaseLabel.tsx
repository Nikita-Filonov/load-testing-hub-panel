import { Chip, SxProps, Theme } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import { ChipPropsColorOverrides } from '@mui/material/Chip/Chip';
import { FC, MouseEvent, ReactElement } from 'react';

export type LabelColor = OverridableStringUnion<
  'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
  ChipPropsColorOverrides
>;

export type BaseLabelProps = {
  sx?: SxProps<Theme>;
  icon?: ReactElement;
  label?: string | number | null;
  color: LabelColor;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
};

export const BaseLabel: FC<BaseLabelProps> = (props) => {
  const { sx, icon, label, color, onClick } = props;

  return <Chip sx={sx} size={'small'} icon={icon} color={color} label={label} onClick={onClick} />;
};
