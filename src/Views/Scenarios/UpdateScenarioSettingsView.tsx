import { BoxView } from '../../Components/Views/BoxView';
import { UpdateScenarioResultSettingsForm } from '../../Components/Forms/Scenarios/UpdateScenarioResultSettingsForm';
import { FC, Fragment } from 'react';
import {
  ScenarioMethodSettings,
  ScenarioResultSettings,
  UpdateScenarioSettingsRequest
} from '../../Models/Services/ScenarioSettings';
import { UpdateScenarioMethodSettingsView } from './UpdateScenarioMethodSettingsView';

type UpdateScenarioSettingsViewProps = {
  request: UpdateScenarioSettingsRequest;
  setRequest: (request: UpdateScenarioSettingsRequest) => void;
  scenarioId: number;
};

export const UpdateScenarioSettingsView: FC<UpdateScenarioSettingsViewProps> = (props) => {
  const { request, setRequest, scenarioId } = props;

  const onSetResultSettings = (resultSettings: ScenarioResultSettings) => {
    setRequest({ ...request, resultSettings });
  };

  const onSetMethodSettings = (methodsSettings: ScenarioMethodSettings[]) => {
    setRequest({ ...request, methodsSettings });
  };

  return (
    <Fragment>
      <BoxView title={'Aggregated'} containerSx={{ mt: 0 }}>
        <UpdateScenarioResultSettingsForm settings={request.resultSettings} setSettings={onSetResultSettings} />
      </BoxView>
      <UpdateScenarioMethodSettingsView
        scenarioId={scenarioId}
        methodsSettings={request.methodsSettings}
        setMethodsSettings={onSetMethodSettings}
      />
    </Fragment>
  );
};
