import { BaseModal } from '../BaseModal';
import { WelcomeView } from '../../../Views/Welcome/WelcomeView';
import { FC } from 'react';

type WelcomeModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
};

export const WelcomeModal: FC<WelcomeModalProps> = ({ modal, setModal }) => {
  return (
    <BaseModal title={'Welcome!'} modal={modal} setModal={setModal}>
      <WelcomeView />
    </BaseModal>
  );
};
