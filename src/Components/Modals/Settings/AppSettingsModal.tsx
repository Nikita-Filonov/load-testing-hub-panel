import { BaseModal } from '../BaseModal';
import { FC } from 'react';
import { LocalSettingsView } from '../../../Views/Settings/LocalSettingsView';
import { RemoteSettingsView } from '../../../Views/Settings/RemoteSettingsView';

type AppSettingsModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
};

export const AppSettingsModal: FC<AppSettingsModalProps> = (props) => {
  const { modal, setModal } = props;

  const onClose = () => setModal(false);

  return (
    <BaseModal title={'App settings'} modal={modal} setModal={setModal} onCancel={onClose}>
      <LocalSettingsView />
      <RemoteSettingsView />
    </BaseModal>
  );
};
