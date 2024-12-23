import React, { Fragment, useState } from 'react';
import { AppSettingsFeature, AppSettingsModal } from '../../Modals/Settings/AppSettingsModal';
import ServiceLabel from '../../Labels/Services/ServiceLabel';
import { ScenariosProvider } from '../../../Providers/Services/ScenariosProvider';
import { AppInfoModal } from '../../Modals/AppInfoModal';
import ServicesAppSettingsButton from '../../Buttons/Settings/ServicesAppSettingsButton';
import { AppInfoButton } from '../../Buttons/AppInfoButton';

export const ServicesNavbarActions = () => {
  const [appInfoModal, setAppInfoModal] = useState(false);
  const [appSettingsModal, setAppSettingsModal] = useState(false);

  const onAppInfo = () => setAppInfoModal(true);

  const onAppSettings = () => setAppSettingsModal(true);

  return (
    <Fragment>
      <ServiceLabel />
      <ServicesAppSettingsButton onAppSettings={onAppSettings} />
      <AppInfoButton onAppInfo={onAppInfo} />
      <AppInfoModal modal={appInfoModal} setModal={setAppInfoModal} />
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
