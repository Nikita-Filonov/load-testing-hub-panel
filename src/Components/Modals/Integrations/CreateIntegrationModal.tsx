import { BaseModal } from '../BaseModal';
import { FC, useEffect, useState } from 'react';
import { IntegrationsErrorKey, useIntegrations } from '../../../Providers/Integrations/IntegrationsProvider';
import { CreateIntegrationRequest } from '../../../Models/Integrations/Integrations';
import { getDefaultCreateIntegrationRequest } from '../../../Services/Integrations/Utils';
import { CreateIntegrationForm } from '../../Forms/Integrations/CreateIntegrationForm';
import { useValidationErrors } from '../../../Services/Clients/Hooks';

type CreateIntegrationModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  serviceId: number;
};

export const CreateIntegrationModal: FC<CreateIntegrationModalProps> = (props) => {
  const { modal, setModal, serviceId } = props;
  const { loading, createIntegration } = useIntegrations();
  const { validationErrors, clearValidationErrors } = useValidationErrors({
    key: IntegrationsErrorKey.CreateIntegration
  });
  const [request, setRequest] = useState<CreateIntegrationRequest>(getDefaultCreateIntegrationRequest());

  useEffect(() => {
    if (modal) {
      setRequest(getDefaultCreateIntegrationRequest());
    }
  }, [modal]);

  const onClose = () => {
    setModal(false);
    clearValidationErrors();
  };

  const onCreate = async () => {
    const result = await createIntegration({ ...request, serviceId });
    if (!result.error) {
      onClose();
    }
  };

  return (
    <BaseModal
      title={'Create integration'}
      modal={modal}
      setModal={setModal}
      onCancel={onClose}
      onConfirm={onCreate}
      confirmLoading={loading.createIntegration}>
      <CreateIntegrationForm request={request} setRequest={setRequest} validationErrors={validationErrors} />
    </BaseModal>
  );
};
