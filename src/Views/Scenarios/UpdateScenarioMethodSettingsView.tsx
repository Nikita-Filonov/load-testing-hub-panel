import { FC, useState } from 'react';
import { EmptyView } from '../../Components/Views/EmptyView';
import { ScenarioMethodSettingsListItem } from '../../Components/ListItems/Scenarios/ScenarioMethodSettingsListItem';
import { ScenarioMethodSettings } from '../../Models/Services/ScenarioSettings';
import UpdateScenarioMethodSettingsModal from '../../Components/Modals/Scenarios/UpdateScenarioMethodSettingsModal';
import { BoxView } from '../../Components/Views/BoxView';
import AddIcon from '@mui/icons-material/Add';
import { MethodsProvider } from '../../Providers/Methods/MethodsProvider';
import { getDefaultScenarioMethodSettings } from '../../Services/Scenarios/Utils';

type UpdateScenarioMethodSettingsViewProps = {
  scenarioId: number;
  methodsSettings: ScenarioMethodSettings[];
  setMethodsSettings: (methodsSettings: ScenarioMethodSettings[]) => void;
};

export const UpdateScenarioMethodSettingsView: FC<UpdateScenarioMethodSettingsViewProps> = (props) => {
  const { scenarioId, methodsSettings, setMethodsSettings } = props;
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [updateScenarioMethodSettingsModal, setUpdateScenarioMethodSettingsModal] = useState(false);

  const onSetMethodSettings = (settings: ScenarioMethodSettings) => {
    const updatedMethodsSettings = [...methodsSettings];
    updatedMethodsSettings[selectedIndex] = settings;

    setMethodsSettings(updatedMethodsSettings);
  };

  const onDeleteMethodSettings = (index: number) => () => {
    const updatedMethodsSettings = [...methodsSettings];
    updatedMethodsSettings.splice(index, 1);

    setMethodsSettings(updatedMethodsSettings);
  };

  const onUpdateMethodSettings = (index: number) => () => {
    setSelectedIndex(index);
    setUpdateScenarioMethodSettingsModal(true);
  };

  const onNewMethodSettings = () => {
    const updatedMethodsSettings = [...methodsSettings, getDefaultScenarioMethodSettings()];
    setMethodsSettings(updatedMethodsSettings);
  };

  return (
    <BoxView title={'Methods'} actions={[{ icon: <AddIcon />, onClick: onNewMethodSettings }]}>
      {methodsSettings.length === 0 && (
        <EmptyView title={'There is no methods'} description={'Tap on add method button to add a new one'} />
      )}
      {methodsSettings.map((settings, index) => (
        <ScenarioMethodSettingsListItem
          key={index}
          settings={settings}
          onDeleteSettings={onDeleteMethodSettings(index)}
          onUpdateSettings={onUpdateMethodSettings(index)}
        />
      ))}
      <MethodsProvider>
        <UpdateScenarioMethodSettingsModal
          modal={updateScenarioMethodSettingsModal}
          setModal={setUpdateScenarioMethodSettingsModal}
          settings={methodsSettings[selectedIndex]}
          setSettings={onSetMethodSettings}
          scenarioId={scenarioId}
        />
      </MethodsProvider>
    </BoxView>
  );
};
