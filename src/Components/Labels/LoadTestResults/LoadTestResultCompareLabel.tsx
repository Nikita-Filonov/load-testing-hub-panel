import { BaseLabel } from '../BaseLabel';
import { FC } from 'react';
import { getLoadTestResultCompareColor, getLoadTestResultCompareTitle } from '../../../Services/Results/Utils';
import { SxProps, Theme } from '@mui/material';

type LoadTestResultCompareLabelProps = {
  sx?: SxProps<Theme>;
  percent?: number;
  context: string;
};

export const LoadTestResultCompareLabel: FC<LoadTestResultCompareLabelProps> = ({ sx, percent, context }) => {
  return (
    <BaseLabel
      sx={sx}
      color={getLoadTestResultCompareColor(percent)}
      label={getLoadTestResultCompareTitle({ percent, context })}
    />
  );
};
