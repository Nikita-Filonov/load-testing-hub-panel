import { FC } from 'react';
import { DeleteModal } from '../DeleteModal';
import { useIntegrations } from '../../../Providers/Integrations/IntegrationsProvider';

type DeleteIntegrationModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  integrationId: number;
};

export const DeleteIntegrationModal: FC<DeleteIntegrationModalProps> = (props) => {
  const { modal, setModal, integrationId } = props;
  const { loading, deleteIntegration } = useIntegrations();

  const onClose = () => setModal(false);

  const onDelete = async () => {
    const result = await deleteIntegration(integrationId);
    if (!result.error) {
      onClose();
    }
  };

  return (
    <DeleteModal
      title={'Delete integration?'}
      modal={modal}
      setModal={setModal}
      onConfirm={onDelete}
      confirmLoading={loading.deleteIntegration}
    />
  );
};
