import { BaseModal } from '../BaseModal';
import { FC } from 'react';
import { ThemeModeSettingsView } from '../../../Views/Settings/ThemeModeSettingsView';

type AppSettingsModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
};

export const AppSettingsModal: FC<AppSettingsModalProps> = (props) => {
  const { modal, setModal } = props;

  const onClose = () => setModal(false);

  return (
    <BaseModal title={'App settings'} modal={modal} setModal={setModal} onCancel={onClose}>
      <ThemeModeSettingsView />
    </BaseModal>
  );
};
