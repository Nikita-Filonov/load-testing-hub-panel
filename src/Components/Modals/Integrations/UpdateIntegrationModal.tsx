import { BaseModal } from '../BaseModal';
import { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { Integration, UpdateIntegrationRequest } from '../../../Models/Integrations/Integrations';
import { getDefaultUpdateIntegrationRequest } from '../../../Services/Integrations/Utils';
import { IntegrationsErrorKey, useIntegrations } from '../../../Providers/Integrations/IntegrationsProvider';
import { CreateIntegrationForm } from '../../Forms/Integrations/CreateIntegrationForm';
import { useValidationErrors } from '../../../Services/Clients/Hooks';

type UpdateIntegrationModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  integration: Integration;
  integrationId: number;
};

const UpdateIntegrationModal: FC<UpdateIntegrationModalProps> = (props) => {
  const { modal, setModal, integration, integrationId } = props;
  const { loading, getIntegration, updateIntegration } = useIntegrations();
  const { validationErrors, clearValidationErrors } = useValidationErrors({
    key: IntegrationsErrorKey.UpdateIntegration
  });
  const [request, setRequest] = useState<UpdateIntegrationRequest>(getDefaultUpdateIntegrationRequest());

  useEffect(() => {
    if (modal) {
      setRequest(integration);
    }
  }, [modal, integration]);

  useEffect(() => {
    if (modal) {
      getIntegration(integrationId);
    }
  }, [modal, integrationId]);

  const onClose = () => {
    setModal(false);
    clearValidationErrors();
  };

  const onUpdate = async () => {
    const result = await updateIntegration(integrationId, request);
    if (!result.error) {
      onClose();
    }
  };

  return (
    <BaseModal
      title={'Update integration'}
      modal={modal}
      setModal={setModal}
      loading={loading.getIntegration}
      onCancel={onClose}
      onConfirm={onUpdate}
      confirmLoading={loading.updateIntegration}>
      <CreateIntegrationForm request={request} setRequest={setRequest} validationErrors={validationErrors} />
    </BaseModal>
  );
};

const getState = (state: ReduxState) => ({ integration: state.integrations.integration });
export default connect(getState)(UpdateIntegrationModal);
