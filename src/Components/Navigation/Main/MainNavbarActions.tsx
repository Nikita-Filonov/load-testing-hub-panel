import React, { Fragment, useState } from 'react';
import { AppInfoModal } from '../../Modals/AppInfoModal';
import { AppSettingsModal } from '../../Modals/Settings/AppSettingsModal';
import { AppInfoButton } from '../../Buttons/AppInfoButton';
import { AppSettingsButton } from '../../Buttons/AppSettingsButton';

export const MainNavbarActions = () => {
  const [appInfoModal, setAppInfoModal] = useState(false);
  const [appSettingsModal, setAppSettingsModal] = useState(false);

  const onAppInfo = () => setAppInfoModal(true);

  const onAppSettings = () => setAppSettingsModal(true);

  return (
    <Fragment>
      <AppSettingsButton onAppSettings={onAppSettings} />
      <AppInfoButton onAppInfo={onAppInfo} />
      <AppInfoModal modal={appInfoModal} setModal={setAppInfoModal} />
      <AppSettingsModal modal={appSettingsModal} setModal={setAppSettingsModal} />
    </Fragment>
  );
};
