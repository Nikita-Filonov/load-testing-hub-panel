import { BaseNumeratedProgress } from '../BaseNumeratedProgress';
import { FC } from 'react';
import { useTheme } from '@mui/material';

type NumberOfRequestsProgressProps = {
  requests: number;
  failures: number;
  requestsTitle: string;
  failuresTitle: string;
};

export const NumberOfRequestsProgress: FC<NumberOfRequestsProgressProps> = (props) => {
  const { requests, failures, requestsTitle, failuresTitle } = props;
  const { palette } = useTheme();

  return (
    <BaseNumeratedProgress
      values={[
        {
          color: palette.mode === 'light' ? palette.success.light : palette.success.dark,
          value: requests,
          label: requestsTitle
        },
        {
          color: palette.mode === 'light' ? palette.error.light : palette.error.dark,
          value: failures,
          label: failuresTitle
        }
      ]}
    />
  );
};
