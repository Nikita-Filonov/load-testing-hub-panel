import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import IconButton from '@mui/material/IconButton';
import React, { FC } from 'react';

type Props = {
  onAppSettings: () => void;
};

export const AppSettingsButton: FC<Props> = ({ onAppSettings }) => {
  return (
    <IconButton sx={{ mr: 1 }} color="inherit" onClick={onAppSettings}>
      <SettingsOutlinedIcon />
    </IconButton>
  );
};
