import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import IconButton from '@mui/material/IconButton';
import React, { FC } from 'react';

type AppInfoButtonProps = {
  onAppInfo: () => void;
};

export const AppInfoButton: FC<AppInfoButtonProps> = ({ onAppInfo }) => {
  return (
    <IconButton color="inherit" onClick={onAppInfo}>
      <InfoOutlinedIcon />
    </IconButton>
  );
};
