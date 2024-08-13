import { FC, useEffect, useState } from 'react';
import { BaseModal } from '../BaseModal';
import { ScenarioSettings } from '../../../Models/Services/ScenarioSettings';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { useScenarioSettings } from '../../../Providers/Services/ScenarioSettingsProvider';
import { LoadingView } from '../../Views/LoadingView';
import { UpdateScenarioSettingsView } from '../../../Views/Scenarios/UpdateScenarioSettingsView';
import { useMethods } from '../../../Providers/Results/MethodsProvider';
import { Service } from '../../../Models/Services/Services';
import { ShortMethod } from '../../../Models/Results/Methods';

type ScenarioSettingsModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  methods: ShortMethod[];
  service: Service;
  settings: ScenarioSettings;
  scenarioName: string;
};

const ScenarioSettingsModal: FC<ScenarioSettingsModalProps> = (props) => {
  const { modal, setModal, methods, service, settings: storeSettings, scenarioName } = props;
  const { getShortMethods } = useMethods();
  const { loading, getScenarioSettings, updateScenarioSettings } = useScenarioSettings();
  const [settings, setSettings] = useState<ScenarioSettings>(storeSettings);

  useEffect(() => {
    modal && setSettings(storeSettings);
  }, [modal, storeSettings]);

  useEffect(() => {
    if (scenarioName && modal) {
      getScenarioSettings(scenarioName);
      getShortMethods({ service: service.name, scenario: scenarioName });
    }
  }, [scenarioName, modal, service.name]);

  const onClose = () => setModal(false);

  const onUpdate = async () => {
    const error = await updateScenarioSettings({ settings });
    !error && onClose();
  };

  return (
    <BaseModal
      loading={loading.updateScenarioSettings}
      title={'Scenario settings'}
      modal={modal}
      setModal={setModal}
      onConfirm={onUpdate}>
      {loading.getScenarioSettings ? (
        <LoadingView height={300} />
      ) : (
        <UpdateScenarioSettingsView methods={methods} settings={settings} setSettings={setSettings} />
      )}
    </BaseModal>
  );
};

const getState = (state: ReduxState) => ({
  methods: state.methods.shortMethods,
  service: state.services.service,
  settings: state.scenarios.scenarioSettings
});
export default connect(getState)(ScenarioSettingsModal);
