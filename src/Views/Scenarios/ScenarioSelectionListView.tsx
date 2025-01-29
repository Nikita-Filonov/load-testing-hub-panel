import List from '@mui/material/List';
import { connect, useDispatch } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import { Service } from '../../Models/Services/Services';
import { FC, useEffect, useMemo, useState } from 'react';
import { BoxView } from '../../Components/Views/BoxView';
import { useScenarios } from '../../Providers/Services/ScenariosProvider';
import { Scenario } from '../../Models/Services/Scenarios';
import { EmptyView } from '../../Components/Views/EmptyView';
import { ScenarioSelectionListItem } from '../../Components/ListItems/Scenarios/ScenarioSelectionListItem';
import { INITIAL_SCENARIOS } from '../../Redux/Services/Scenarios/InitialState';
import { setScenario } from '../../Redux/Services/Scenarios/Slice';
import { SearchTextField } from '../../Components/TextFields/SearchTextField';

type Props = {
  service: Service;
  scenario: Scenario;
  scenarios: Scenario[];
  onSelectScenarioCallback?: () => void;
};

const ScenarioSelectionListView: FC<Props> = ({ service, scenario, scenarios, onSelectScenarioCallback }) => {
  const dispatch = useDispatch();
  const { loading, getScenarios } = useScenarios();
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (service.id) {
      getScenarios({ serviceId: service.id });
    }
  }, [service.id]);

  const filteredScenarios = useMemo(
    () => scenarios.filter((scenario) => scenario.name.toLowerCase().includes(search.toLowerCase())),
    [search, scenarios]
  );

  const onSelectScenario = (scenario: Scenario | null) => {
    dispatch(setScenario(scenario ? scenario : INITIAL_SCENARIOS.scenario));

    if (onSelectScenarioCallback) {
      onSelectScenarioCallback();
    }
  };

  return (
    <BoxView title={'Scenarios'} loading={loading.getScenarios} containerSx={{ mt: 0 }}>
      {scenarios.length === 0 && !loading.getScenarios && (
        <EmptyView
          title={'There is no scenarios'}
          description={'Scenarios will be displayed here when some results will be uploaded to system'}
        />
      )}
      {scenarios.length > 0 && !loading.getScenarios && (
        <SearchTextField sx={{ mb: 2 }} value={search} onChange={setSearch} placeholder={'Search by name'} />
      )}
      <List dense>
        {filteredScenarios.map((item, index) => (
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
