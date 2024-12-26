import { BaseModal } from '../BaseModal';
import { FC, useEffect, useState } from 'react';
import { useIntegrations } from '../../../Providers/Integrations/IntegrationsProvider';
import { CreateIntegrationRequest } from '../../../Models/Integrations/Integrations';
import { getDefaultCreateIntegrationRequest } from '../../../Services/Integrations/Utils';
import { CreateIntegrationForm } from '../../Forms/Integrations/CreateIntegrationForm';

type CreateIntegrationModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  serviceId: number;
};

export const CreateIntegrationModal: FC<CreateIntegrationModalProps> = (props) => {
  const { modal, setModal, serviceId } = props;
  const { loading, createIntegration } = useIntegrations();
  const [request, setRequest] = useState<CreateIntegrationRequest>(getDefaultCreateIntegrationRequest());

  useEffect(() => {
    modal && setRequest(getDefaultCreateIntegrationRequest());
  }, [modal]);

  const onClose = () => setModal(false);

  const onCreate = async () => {
    const error = await createIntegration({ ...request, serviceId });
    !error && onClose();
  };

  return (
    <BaseModal
      title={'Create integration'}
      modal={modal}
      setModal={setModal}
      onConfirm={onCreate}
      confirmLoading={loading.createIntegration}>
      <CreateIntegrationForm request={request} setRequest={setRequest} />
    </BaseModal>
  );
};
