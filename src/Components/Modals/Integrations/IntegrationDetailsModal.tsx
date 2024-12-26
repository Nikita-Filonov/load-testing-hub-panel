import { FC } from 'react';
import { BaseModal } from '../BaseModal';
import IntegrationView from '../../../Views/Integrations/IntegrationView';

type IntegrationDetailsModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  integrationId: number;
};

export const IntegrationDetailsModal: FC<IntegrationDetailsModalProps> = (props) => {
  const { modal, setModal, integrationId } = props;

  return (
    <BaseModal title={'Integration details'} modal={modal} setModal={setModal}>
      <IntegrationView integrationId={integrationId} />
    </BaseModal>
  );
};
