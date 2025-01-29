import { BaseModal } from '../BaseModal';
import { FC, useEffect, useState } from 'react';
import { CreateScenarioForm } from '../../Forms/Scenarios/CreateScenarioForm';
import { ScenarioDetails, UpdateScenarioRequest } from '../../../Models/Services/Scenarios';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { ScenariosErrorKey, useScenarios } from '../../../Providers/Services/ScenariosProvider';
import { getDefaultUpdateScenarioRequest } from '../../../Services/Scenarios/Utils';
import { useValidationErrors } from '../../../Services/Clients/Hooks';

type UpdateScenarioModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  details: ScenarioDetails;
  scenarioId: number;
};

const UpdateScenarioModal: FC<UpdateScenarioModalProps> = (props) => {
  const { modal, setModal, details, scenarioId } = props;
  const { loading, updateScenario, getScenarioDetails } = useScenarios();
  const { validationErrors, clearValidationErrors } = useValidationErrors({ key: ScenariosErrorKey.UpdateScenario });
  const [request, setRequest] = useState<UpdateScenarioRequest>(getDefaultUpdateScenarioRequest());

  useEffect(() => {
    if (modal) {
      setRequest(details);
    }
  }, [modal, details]);

  useEffect(() => {
    if (modal) {
      getScenarioDetails(scenarioId);
    }
  }, [modal, scenarioId]);

  const onClose = () => {
    setModal(false);
    clearValidationErrors();
  };

  const onUpdate = async () => {
    const result = await updateScenario(scenarioId, request);
    if (!result.error) {
      onClose();
    }
  };

  return (
    <BaseModal
      title={'Update scenario'}
      modal={modal}
      setModal={setModal}
      loading={loading.getScenarioDetails}
      onCancel={onClose}
      onConfirm={onUpdate}
      confirmLoading={loading.updateScenario}>
      <CreateScenarioForm request={request} setRequest={setRequest} validationErrors={validationErrors} />
    </BaseModal>
  );
};

const getState = (state: ReduxState) => ({ details: state.scenarios.scenarioDetails });
export default connect(getState)(UpdateScenarioModal);
