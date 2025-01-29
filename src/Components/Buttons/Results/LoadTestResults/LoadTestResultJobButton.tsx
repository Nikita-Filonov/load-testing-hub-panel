import { LoadTestResult } from '../../../../Models/Results/LoadTestResults';
import { FC } from 'react';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import IconButton from '@mui/material/IconButton';
import { OnlineBadge } from '../../../Badges/OnlineBadge';

type LoadTestResultJobButtonProps = {
  result: LoadTestResult;
};

export const LoadTestResultJobButton: FC<LoadTestResultJobButtonProps> = ({ result }) => {
  if (!result.loadTestsCIJobUrl) return null;

  const onOpenJob = () => {
    if (result.loadTestsCIJobUrl) {
      window.open(result.loadTestsCIJobUrl, '_blank');
    }
  };

  return (
    <IconButton size={'small'} onClick={onOpenJob}>
      <OnlineBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
        <BuildCircleOutlinedIcon />
      </OnlineBadge>
    </IconButton>
  );
};
