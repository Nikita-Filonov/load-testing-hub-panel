import List from '@mui/material/List';
import { connect, useDispatch } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import { Service } from '../../Models/Services/Services';
import { FC, useEffect } from 'react';
import { BoxView } from '../../Components/Views/BoxView';
import { useScenarios } from '../../Providers/Services/ScenariosProvider';
import { Scenario } from '../../Models/Services/Scenarios';
import { EmptyView } from '../../Components/Views/EmptyView';
import { ScenarioSelectionListItem } from '../../Components/ListItems/Scenarios/ScenarioSelectionListItem';
import { INITIAL_SCENARIOS } from '../../Redux/Services/Scenarios/InitialState';
import { setScenario } from '../../Redux/Services/Scenarios/ScenariosSlice';

type ScenarioSelectionListViewProps = {
  service: Service;
  scenario: Scenario;
  scenarios: Scenario[];
};

const ScenarioSelectionListView: FC<ScenarioSelectionListViewProps> = ({ service, scenario, scenarios }) => {
  const dispatch = useDispatch();
  const { loading, getScenarios } = useScenarios();

  useEffect(() => {
    service.id && getScenarios({ serviceId: service.id });
  }, [service.id]);

  const onSelectScenario = (scenario: Scenario | null) => {
    dispatch(setScenario(scenario ? scenario : INITIAL_SCENARIOS.scenario));
  };

  return (
    <BoxView title={'Scenarios'} loading={loading.getScenarios}>
      {scenarios.length === 0 && !loading.getScenarios && (
        <EmptyView
          title={'There is no scenarios'}
          description={'Scenarios will be displayed here when some results will be uploaded to system'}
        />
      )}
      <List dense>
        {scenarios.map((item, index) => (
          <ScenarioSelectionListItem
            key={index}
            scenario={item}
            selected={item.id == scenario.id}
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
  scenarios: state.scenarios.scenarios
});
export default connect(getState)(ScenarioSelectionListView);
