import { FC, useEffect, useState } from 'react';
import { BaseModal } from '../BaseModal';
import { ScenarioSettings, UpdateScenarioSettingsRequest } from '../../../Models/Services/ScenarioSettings';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { useScenarioSettings } from '../../../Providers/Services/ScenarioSettingsProvider';
import { UpdateScenarioSettingsView } from '../../../Views/Scenarios/UpdateScenarioSettingsView';
import { getDefaultUpdateScenarioSettingsRequest } from '../../../Services/Scenarios/Utils';

type UpdateScenarioSettingsModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  settings: ScenarioSettings;
  scenarioId: number;
};

const UpdateScenarioSettingsModal: FC<UpdateScenarioSettingsModalProps> = (props) => {
  const { modal, setModal, settings, scenarioId } = props;
  const { loading, getScenarioSettings, updateScenarioSettings } = useScenarioSettings();
  const [request, setRequest] = useState<UpdateScenarioSettingsRequest>(getDefaultUpdateScenarioSettingsRequest());

  useEffect(() => {
    modal && setRequest(settings);
  }, [modal, settings]);

  useEffect(() => {
    scenarioId && modal && getScenarioSettings(scenarioId);
  }, [scenarioId, modal]);

  const onClose = () => setModal(false);

  const onUpdate = async () => {
    const error = await updateScenarioSettings(scenarioId, request);
    !error && onClose();
  };

  return (
    <BaseModal
      loading={loading.getScenarioSettings}
      title={'Scenario settings'}
      modal={modal}
      setModal={setModal}
      onConfirm={onUpdate}
      confirmLoading={loading.updateScenarioSettings}>
      <UpdateScenarioSettingsView request={request} setRequest={setRequest} scenarioId={scenarioId} />
    </BaseModal>
  );
};

const getState = (state: ReduxState) => ({
  settings: state.scenarios.scenarioSettings
});
export default connect(getState)(UpdateScenarioSettingsModal);
