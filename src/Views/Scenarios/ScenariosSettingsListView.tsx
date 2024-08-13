import List from '@mui/material/List';
import { connect, useDispatch } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import { Service } from '../../Models/Services/Services';
import { FC, useEffect } from 'react';
import { BoxView } from '../../Components/Views/BoxView';
import { useScenarios } from '../../Providers/Services/ScenariosProvider';
import { Scenario } from '../../Models/Services/Scenarios';
import { EmptyView } from '../../Components/Views/EmptyView';
import { ScenarioSettingsListItem } from '../../Components/ListItems/Scenarios/ScenarioSettingsListItem';
import { INITIAL_SCENARIOS } from '../../Redux/Services/Scenarios/InitialState';
import { setScenario } from '../../Redux/Services/Scenarios/ScenariosSlice';

type ScenariosSettingsListViewProps = {
  service: Service;
  scenario: Scenario;
  scenarios: Scenario[];
};

const ScenariosSettingsListView: FC<ScenariosSettingsListViewProps> = ({ service, scenario, scenarios }) => {
  const dispatch = useDispatch();
  const { loading, getSettingsScenarios } = useScenarios();

  useEffect(() => {
    getSettingsScenarios({ service: service.name });
  }, [service.name]);

  const onSelectScenario = (scenario: Scenario | null) => {
    dispatch(setScenario(scenario ? scenario : INITIAL_SCENARIOS.scenario));
  };

  return (
    <BoxView title={'Scenarios'} loading={loading.getSettingsScenarios}>
      {scenarios.length === 0 && !loading.getSettingsScenarios && (
        <EmptyView
          title={'There is no scenarios'}
          description={'Scenarios will be displayed here when some results will be uploaded to system'}
        />
      )}
      <List dense>
        {scenarios.map((item, index) => (
          <ScenarioSettingsListItem
            key={index}
            scenario={item}
            selected={item.name == scenario.name}
            onSelectScenario={onSelectScenario}
          />
        ))}
      </List>
    </BoxView>
  );
};

const getState = (state: ReduxState) => ({
  service: state.services.service,
  scenario: state.scenarios.scenario,
  scenarios: state.scenarios.settingsScenarios
});
export default connect(getState)(ScenariosSettingsListView);
