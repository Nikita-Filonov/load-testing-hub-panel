import { BaseModal } from '../BaseModal';
import { FC, useEffect, useState } from 'react';
import { CreateScenarioForm } from '../../Forms/Scenarios/CreateScenarioForm';
import { ScenarioDetails, UpdateScenarioRequest } from '../../../Models/Services/Scenarios';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { useScenarios } from '../../../Providers/Services/ScenariosProvider';
import { getDefaultUpdateScenarioRequest } from '../../../Services/Scenarios/Utils';

type UpdateScenarioModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  details: ScenarioDetails;
  scenarioId: number;
};

const UpdateScenarioModal: FC<UpdateScenarioModalProps> = (props) => {
  const { modal, setModal, details, scenarioId } = props;
  const { loading, updateScenario, getScenarioDetails } = useScenarios();
  const [request, setRequest] = useState<UpdateScenarioRequest>(getDefaultUpdateScenarioRequest());

  useEffect(() => {
    modal &&
      setRequest({
        name: details.name,
        file: details.file,
        tags: details.tags,
        version: details.version,
        ratioTotal: details.ratioTotal,
        ratioPerClass: details.ratioPerClass
      });
  }, [modal, details]);

  useEffect(() => {
    modal && getScenarioDetails(scenarioId);
  }, [modal, scenarioId]);

  const onClose = () => setModal(false);

  const onUpdate = async () => {
    const error = await updateScenario(scenarioId, request);
    !error && onClose();
  };

  return (
    <BaseModal
      title={'Update scenario'}
      modal={modal}
      setModal={setModal}
      loading={loading.getScenarioDetails}
      onConfirm={onUpdate}
      confirmLoading={loading.updateScenario}>
      <CreateScenarioForm request={request} setRequest={setRequest} />
    </BaseModal>
  );
};

const getState = (state: ReduxState) => ({ details: state.scenarios.scenarioDetails });
export default connect(getState)(UpdateScenarioModal);
