import { BaseModal } from './BaseModal';
import { AppInfoView } from '../../Views/AppInfoView';
import { FC } from 'react';

type AppInfoModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
};

export const AppInfoModal: FC<AppInfoModalProps> = ({ modal, setModal }) => {
  return (
    <BaseModal title={'Welcome!'} modal={modal} setModal={setModal}>
      <AppInfoView />
    </BaseModal>
  );
};
