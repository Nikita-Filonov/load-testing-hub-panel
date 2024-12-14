import React, { Fragment, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { AppSettingsFeature, AppSettingsModal } from '../../Modals/Settings/AppSettingsModal';
import ServiceLabel from '../../Labels/Services/ServiceLabel';
import { ScenariosProvider } from '../../../Providers/Services/ScenariosProvider';
import { WelcomeModal } from '../../Modals/Welcome/WelcomeModal';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export const ServicesNavbarActions = () => {
  const [welcomeModal, setWelcomeModal] = useState(false);
  const [appSettingsModal, setAppSettingsModal] = useState(false);

  const onWelcome = () => setWelcomeModal(true);

  const onAppSettings = () => setAppSettingsModal(true);

  return (
    <Fragment>
      <ServiceLabel />
      <IconButton sx={{ mr: 2 }} color="inherit" onClick={onAppSettings}>
        <SettingsOutlinedIcon />
      </IconButton>
      <IconButton color="inherit" onClick={onWelcome}>
        <InfoOutlinedIcon />
      </IconButton>
      <WelcomeModal modal={welcomeModal} setModal={setWelcomeModal} />
      <ScenariosProvider>
        <AppSettingsModal
          modal={appSettingsModal}
          setModal={setAppSettingsModal}
          features={[AppSettingsFeature.Theme, AppSettingsFeature.Scenarios]}
        />
      </ScenariosProvider>
    </Fragment>
  );
};
