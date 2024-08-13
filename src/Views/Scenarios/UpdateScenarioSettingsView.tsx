import { BoxView } from '../../Components/Views/BoxView';
import { UpdateScenarioSettingsForm } from '../../Components/Forms/Scenarios/UpdateScenarioSettingsForm';
import { EmptyView } from '../../Components/Views/EmptyView';
import { UpdateScenarioMethodSettingsForm } from '../../Components/Forms/Scenarios/UpdateScenarioMethodSettingsForm';
import { Button } from '@mui/material';
import { Dispatch, FC, Fragment, SetStateAction } from 'react';
import { ScenarioMethodSettings, ScenarioSettings } from '../../Models/Services/ScenarioSettings';
import { ShortMethod } from '../../Models/Results/Methods';

type UpdateScenarioSettingsViewProps = {
  methods: ShortMethod[];
  settings: ScenarioSettings;
  setSettings: Dispatch<SetStateAction<ScenarioSettings>>;
};

export const UpdateScenarioSettingsView: FC<UpdateScenarioSettingsViewProps> = (props) => {
  const { methods, settings, setSettings } = props;

  const onUpdateMethodSettings = (index: number) => (methodSettings: ScenarioMethodSettings) => {
    setSettings((prevSettings) => {
      const updatedMethodsSettings = [...prevSettings.methodsSettings];
      updatedMethodsSettings[index] = methodSettings;

      return {
        ...prevSettings,
        methodsSettings: updatedMethodsSettings
      };
    });
  };

  const onDeleteMethodSettings = (index: number) => () => {
    setSettings((prevSettings) => {
      const updatedMethodsSettings = [...prevSettings.methodsSettings];
      updatedMethodsSettings.splice(index, 1);

      return {
        ...prevSettings,
        methodsSettings: updatedMethodsSettings
      };
    });
  };

  const onNewMethodSettings = () => {
    setSettings({
      ...settings,
      methodsSettings: [...settings.methodsSettings, { method: '', requestsPerSecond: 0.0 }]
    });
  };

  return (
    <Fragment>
      <BoxView title={'Aggregated'} titleSx={{ mt: 0 }}>
        <UpdateScenarioSettingsForm settings={settings} setSettings={setSettings} />
      </BoxView>
      <BoxView title={'Methods'}>
        {settings.methodsSettings.length === 0 && (
          <EmptyView title={'There is no methods'} description={'Tap on add method button to add a new one'} />
        )}
        {settings.methodsSettings.map((settings, index) => (
          <UpdateScenarioMethodSettingsForm
            key={index}
            methods={methods}
            settings={settings}
            setSettings={onUpdateMethodSettings(index)}
            onDeleteSettings={onDeleteMethodSettings(index)}
          />
        ))}
        <Button sx={{ mt: 3 }} variant={'outlined'} onClick={onNewMethodSettings}>
          Add method
        </Button>
      </BoxView>
    </Fragment>
  );
};
