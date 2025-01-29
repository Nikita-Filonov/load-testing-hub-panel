import { useScenarios } from '../../Providers/Services/ScenariosProvider';
import { FC, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import { Scenario } from '../../Models/Services/Scenarios';
import { ScenarioListItem } from '../../Components/ListItems/Scenarios/ScenarioListItem';
import List from '@mui/material/List';
import { ScenarioDetailsModal } from '../../Components/Modals/Scenarios/ScenarioDetailsModal';
import { EmptyView } from '../../Components/Views/EmptyView';
import UpdateScenarioSettingsModal from '../../Components/Modals/Scenarios/UpdateScenarioSettingsModal';
import { ScenarioSettingsProvider } from '../../Providers/Services/ScenarioSettingsProvider';
import { Service } from '../../Models/Services/Services';
import { SettingsView } from '../../Components/Views/SettingsView';
import AddIcon from '@mui/icons-material/Add';
import { CreateScenarioModal } from '../../Components/Modals/Scenarios/CreateScenarioModal';
import { INITIAL_SCENARIOS } from '../../Redux/Services/Scenarios/InitialState';
import UpdateScenarioModal from '../../Components/Modals/Scenarios/UpdateScenarioModal';
import { SearchTextField } from '../../Components/TextFields/SearchTextField';

type ScenariosSettingsViewProps = {
  service: Service;
  scenarios: Scenario[];
};

const ScenariosListView: FC<ScenariosSettingsViewProps> = (props) => {
  const { service, scenarios } = props;
  const { loading, getScenarios } = useScenarios();
  const [search, setSearch] = useState('');
  const [scenario, setScenario] = useState<Scenario>(INITIAL_SCENARIOS.scenario);
  const [createScenarioModal, setCreateScenarioModal] = useState(false);
  const [updateScenarioModal, setUpdateScenarioModal] = useState(false);
  const [scenarioDetailsModal, setScenarioDetailsModal] = useState(false);
  const [scenarioSettingsModal, setScenarioSettingsModal] = useState(false);

  useEffect(() => {
    if (service.id) {
      getScenarios({ serviceId: service.id });
    }
  }, [service.id]);

  const filteredScenarios = useMemo(
    () => scenarios.filter((scenario) => scenario.name.toLowerCase().includes(search.toLowerCase())),
    [search, scenarios]
  );

  const onCreateScenario = () => setCreateScenarioModal(true);

  const onUpdateScenario = (scenario: Scenario) => {
    setScenario(scenario);
    setUpdateScenarioModal(true);
  };

  const onScenarioDetails = (scenario: Scenario) => {
    setScenario(scenario);
    setScenarioDetailsModal(true);
  };

  const onScenarioSettings = (scenario: Scenario) => {
    setScenario(scenario);
    setScenarioSettingsModal(true);
  };

  return (
    <SettingsView
      title={'Scenarios'}
      loading={loading.getScenarios}
      actions={[{ icon: <AddIcon />, onClick: onCreateScenario, disabled: !service.id }]}>
      {scenarios.length === 0 && !loading.getScenarios && (
        <EmptyView
          title={'There is no scenarios'}
          description={'To create a scenario, click on the plus sign in the upper right corner'}
        />
      )}
      {scenarios.length > 0 && !loading.getScenarios && (
        <SearchTextField sx={{ mb: 2, mt: 0 }} value={search} onChange={setSearch} placeholder={'Search by name'} />
      )}
      <List dense>
        {filteredScenarios.map((item, index) => (
          <ScenarioListItem
            key={index}
            scenario={item}
            onUpdateScenario={onUpdateScenario}
            onScenarioDetails={onScenarioDetails}
            onScenarioSettings={onScenarioSettings}
          />
        ))}
      </List>
      <CreateScenarioModal modal={createScenarioModal} setModal={setCreateScenarioModal} serviceId={service.id} />
      <UpdateScenarioModal modal={updateScenarioModal} setModal={setUpdateScenarioModal} scenarioId={scenario.id} />
      <ScenarioDetailsModal modal={scenarioDetailsModal} setModal={setScenarioDetailsModal} scenarioId={scenario.id} />
      <ScenarioSettingsProvider>
        <UpdateScenarioSettingsModal
          modal={scenarioSettingsModal}
          setModal={setScenarioSettingsModal}
          scenarioId={scenario.id}
        />
      </ScenarioSettingsProvider>
    </SettingsView>
  );
};

const getState = (state: ReduxState) => ({
  service: state.services.service,
  scenarios: state.scenarios.scenarios
});
export default connect(getState)(ScenariosListView);
