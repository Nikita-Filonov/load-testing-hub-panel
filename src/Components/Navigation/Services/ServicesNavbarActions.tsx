import React, { Fragment, useState } from 'react';
import { AppSettingsModal } from '../../Modals/Settings/AppSettingsModal';
import { AppInfoModal } from '../../Modals/AppInfoModal';
import { AppInfoButton } from '../../Buttons/AppInfoButton';
import { ServiceSelectionPopover } from '../../Popovers/Services/ServiceSelectionPopover';
import { ScenarioSelectionPopover } from '../../Popovers/Scenarios/ScenarioSelectionPopover';
import { AppSettingsButton } from '../../Buttons/AppSettingsButton';

export const ServicesNavbarActions = () => {
  const [appInfoModal, setAppInfoModal] = useState(false);
  const [appSettingsModal, setAppSettingsModal] = useState(false);

  const onAppInfo = () => setAppInfoModal(true);

  const onAppSettings = () => setAppSettingsModal(true);

  return (
    <Fragment>
      <ScenarioSelectionPopover />
      <ServiceSelectionPopover />
      <AppSettingsButton onAppSettings={onAppSettings} />
      <AppInfoButton onAppInfo={onAppInfo} />
      <AppInfoModal modal={appInfoModal} setModal={setAppInfoModal} />
      <AppSettingsModal modal={appSettingsModal} setModal={setAppSettingsModal} />
    </Fragment>
  );
};
