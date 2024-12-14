import { BoxView } from '../../Components/Views/BoxView';
import { UpdateScenarioSettingsForm } from '../../Components/Forms/Scenarios/UpdateScenarioSettingsForm';
import { FC, Fragment } from 'react';
import { ScenarioMethodSettings, UpdateScenarioSettingsRequest } from '../../Models/Services/ScenarioSettings';
import { UpdateScenarioMethodSettingsView } from './UpdateScenarioMethodSettingsView';

type UpdateScenarioSettingsViewProps = {
  request: UpdateScenarioSettingsRequest;
  setRequest: (request: UpdateScenarioSettingsRequest) => void;
  scenarioId: number;
};

export const UpdateScenarioSettingsView: FC<UpdateScenarioSettingsViewProps> = (props) => {
  const { request, setRequest, scenarioId } = props;

  const onSetMethodSettings = (methodsSettings: ScenarioMethodSettings[]) => {
    setRequest({ ...request, methodsSettings });
  };

  return (
    <Fragment>
      <BoxView title={'Aggregated'} containerSx={{ mt: 0 }}>
        <UpdateScenarioSettingsForm request={request} setRequest={setRequest} />
      </BoxView>
      <UpdateScenarioMethodSettingsView
        scenarioId={scenarioId}
        methodsSettings={request.methodsSettings}
        setMethodsSettings={onSetMethodSettings}
      />
    </Fragment>
  );
};
