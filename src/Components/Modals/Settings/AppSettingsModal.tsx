import { BaseModal } from '../BaseModal';
import { FC, Fragment, ReactNode } from 'react';
import { ThemeModeSettingsView } from '../../../Views/Settings/LocalSettings/ThemeModeSettingsView';
import ScenarioSelectionListView from '../../../Views/Scenarios/ScenarioSelectionListView';

export enum AppSettingsFeature {
  Theme = 'main',
  Scenarios = 'scenarios'
}

type AppSettingsModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  features: AppSettingsFeature[];
};

const COMPONENTS: { [feature in AppSettingsFeature]: ReactNode } = {
  [AppSettingsFeature.Theme]: <ThemeModeSettingsView />,
  [AppSettingsFeature.Scenarios]: <ScenarioSelectionListView />
};

export const AppSettingsModal: FC<AppSettingsModalProps> = (props) => {
  const { modal, setModal, features } = props;

  const onClose = () => setModal(false);

  return (
    <BaseModal title={'App settings'} modal={modal} setModal={setModal} onCancel={onClose}>
      {features.map((feature, index) => (
        <Fragment key={index}>{COMPONENTS[feature]}</Fragment>
      ))}
    </BaseModal>
  );
};
