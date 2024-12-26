import { BaseModal } from '../BaseModal';
import { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { Integration, UpdateIntegrationRequest } from '../../../Models/Integrations/Integrations';
import { getDefaultUpdateIntegrationRequest } from '../../../Services/Integrations/Utils';
import { useIntegrations } from '../../../Providers/Integrations/IntegrationsProvider';
import { CreateIntegrationForm } from '../../Forms/Integrations/CreateIntegrationForm';

type UpdateIntegrationModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  integration: Integration;
  integrationId: number;
};

const UpdateIntegrationModal: FC<UpdateIntegrationModalProps> = (props) => {
  const { modal, setModal, integration, integrationId } = props;
  const { loading, getIntegration, updateIntegration } = useIntegrations();
  const [request, setRequest] = useState<UpdateIntegrationRequest>(getDefaultUpdateIntegrationRequest());

  useEffect(() => {
    modal && setRequest(integration);
  }, [modal, integration]);

  useEffect(() => {
    modal && getIntegration(integrationId);
  }, [modal, integrationId]);

  const onClose = () => setModal(false);

  const onUpdate = async () => {
    const error = await updateIntegration(integrationId, request);
    !error && onClose();
  };

  return (
    <BaseModal
      title={'Update integration'}
      modal={modal}
      setModal={setModal}
      loading={loading.getIntegration}
      onConfirm={onUpdate}
      confirmLoading={loading.updateIntegration}>
      <CreateIntegrationForm request={request} setRequest={setRequest} />
    </BaseModal>
  );
};

const getState = (state: ReduxState) => ({ integration: state.integrations.integration });
export default connect(getState)(UpdateIntegrationModal);
