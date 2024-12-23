import { SxProps, Theme } from '@mui/material';
import { FC } from 'react';
import { BaseLabel } from '../BaseLabel';
import { getCompareColor, getCompareTitle } from '../../../Services/Compare/Utils';
import { BaseCompare } from '../../../Models/Compares/Compares';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

type CompareLabelProps = {
  sx?: SxProps<Theme>;
  compare: BaseCompare;
};

export const CompareLabel: FC<CompareLabelProps> = ({ sx, compare }) => {
  return (
    <BaseLabel
      sx={sx}
      icon={compare.highlight ? <ErrorOutlineIcon fontSize={'small'} /> : undefined}
      color={compare.highlight ? 'error' : getCompareColor(compare.compare)}
      label={getCompareTitle({ percent: compare.compare, context: 'comparable' })}
    />
  );
};
