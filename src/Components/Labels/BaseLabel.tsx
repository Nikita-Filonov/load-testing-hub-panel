import { Chip, SxProps, Theme } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import { ChipPropsColorOverrides } from '@mui/material/Chip/Chip';
import { FC, ReactElement } from 'react';

export type LabelColor = OverridableStringUnion<
  'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
  ChipPropsColorOverrides
>;

export type BaseLabelProps = {
  sx?: SxProps<Theme>;
  icon?: ReactElement;
  label?: string | number | null;
  color: LabelColor;
};

export const BaseLabel: FC<BaseLabelProps> = (props) => {
  const { sx, icon, label, color } = props;

  return <Chip sx={sx} size={'small'} icon={icon} color={color} label={label} />;
};
