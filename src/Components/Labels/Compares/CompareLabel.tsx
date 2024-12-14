import { SxProps, Theme } from '@mui/material';
import { FC } from 'react';
import { BaseLabel } from '../BaseLabel';
import { getCompareColor, getCompareTitle } from '../../../Services/Compare/Utils';

type CompareLabelProps = {
  sx?: SxProps<Theme>;
  compare: number;
};

export const CompareLabel: FC<CompareLabelProps> = ({ sx, compare }) => {
  return (
    <BaseLabel
      sx={sx}
      color={getCompareColor(compare)}
      label={getCompareTitle({ percent: compare, context: 'comparable' })}
    />
  );
};
