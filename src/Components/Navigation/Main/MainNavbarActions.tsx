import React, { Fragment, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { AppInfoModal } from '../../Modals/AppInfoModal';
import { AppSettingsFeature, AppSettingsModal } from '../../Modals/Settings/AppSettingsModal';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { AppInfoButton } from '../../Buttons/AppInfoButton';

export const MainNavbarActions = () => {
  const [appInfoModal, setAppInfoModal] = useState(false);
  const [appSettingsModal, setAppSettingsModal] = useState(false);

  const onAppInfo = () => setAppInfoModal(true);

  const onAppSettings = () => setAppSettingsModal(true);

  return (
    <Fragment>
      <IconButton sx={{ mr: 2 }} color="inherit" onClick={onAppSettings}>
        <SettingsOutlinedIcon />
      </IconButton>
      <AppInfoButton onAppInfo={onAppInfo} />
      <AppInfoModal modal={appInfoModal} setModal={setAppInfoModal} />
      <AppSettingsModal modal={appSettingsModal} setModal={setAppSettingsModal} features={[AppSettingsFeature.Theme]} />
    </Fragment>
  );
};
