import { BaseModal } from '../BaseModal';
import { UpdateScenarioMethodSettingsForm } from '../../Forms/Scenarios/UpdateScenarioMethodSettingsForm';
import { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { ShortMethod } from '../../../Models/Methods/Methods';
import { ScenarioMethodSettings } from '../../../Models/Services/ScenarioSettings';
import { useMethods } from '../../../Providers/Methods/MethodsProvider';
import { Service } from '../../../Models/Services/Services';
import { getDefaultScenarioMethodSettings } from '../../../Services/Scenarios/Utils';

type UpdateScenarioMethodSettingsModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  methods: ShortMethod[];
  service: Service;
  settings: ScenarioMethodSettings;
  setSettings: (settings: ScenarioMethodSettings) => void;
  scenarioId: number;
};

const UpdateScenarioMethodSettingsModal: FC<UpdateScenarioMethodSettingsModalProps> = (props) => {
  const { modal, setModal, methods, service, settings, setSettings, scenarioId } = props;
  const { getShortMethods } = useMethods();
  const [internalSettings, setInternalSettings] = useState<ScenarioMethodSettings>(getDefaultScenarioMethodSettings);

  useEffect(() => {
    if (modal) {
      setInternalSettings(settings);
    }
  }, [modal]);

  useEffect(() => {
    if (scenarioId && modal) {
      getShortMethods({ serviceId: service.id, scenarioId });
    }
  }, [modal, service.id, scenarioId]);

  const onClose = () => setModal(false);

  const onSetSettings = () => {
    setSettings(internalSettings);
    onClose();
  };

  return (
    <BaseModal
      title={'Update scenario method settings'}
      modal={modal}
      setModal={setModal}
      onConfirm={onSetSettings}
      confirmDisabled={internalSettings.method === ''}>
      <UpdateScenarioMethodSettingsForm
        methods={methods}
        settings={internalSettings}
        setSettings={setInternalSettings}
      />
    </BaseModal>
  );
};

const getState = (state: ReduxState) => ({
  methods: state.methods.shortMethods,
  service: state.services.service
});
export default connect(getState)(UpdateScenarioMethodSettingsModal);
