import React, { Fragment, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { WelcomeModal } from '../../Modals/Welcome/WelcomeModal';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { AppSettingsFeature, AppSettingsModal } from '../../Modals/Settings/AppSettingsModal';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export const MainNavbarActions = () => {
  const [welcomeModal, setWelcomeModal] = useState(false);
  const [appSettingsModal, setAppSettingsModal] = useState(false);

  const onWelcome = () => setWelcomeModal(true);

  const onAppSettings = () => setAppSettingsModal(true);

  return (
    <Fragment>
      <IconButton sx={{ mr: 2 }} color="inherit" onClick={onAppSettings}>
        <SettingsOutlinedIcon />
      </IconButton>
      <IconButton color="inherit" onClick={onWelcome}>
        <InfoOutlinedIcon />
      </IconButton>
      <WelcomeModal modal={welcomeModal} setModal={setWelcomeModal} />
      <AppSettingsModal modal={appSettingsModal} setModal={setAppSettingsModal} features={[AppSettingsFeature.Theme]} />
    </Fragment>
  );
};
