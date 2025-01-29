import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import IconButton from '@mui/material/IconButton';
import { FC } from 'react';

type MethodResultDetailsButton = {
  onDetails: () => void;
};

export const MethodResultDetailsButton: FC<MethodResultDetailsButton> = ({ onDetails }) => {
  return (
    <IconButton onClick={onDetails}>
      <AnalyticsOutlinedIcon />
    </IconButton>
  );
};
