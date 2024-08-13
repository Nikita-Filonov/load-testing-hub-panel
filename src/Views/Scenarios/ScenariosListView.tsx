import { useScenarios } from '../../Providers/Services/ScenariosProvider';
import { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import { Scenario } from '../../Models/Services/Scenarios';
import { ScenarioListItem } from '../../Components/ListItems/Scenarios/ScenarioListItem';
import { WidgetView } from '../../Components/Views/WidgetView';
import List from '@mui/material/List';
import { ScenarioDetailsModal } from '../../Components/Modals/Scenarios/ScenarioDetailsModal';
import { EmptyView } from '../../Components/Views/EmptyView';
import ScenarioSettingsModal from '../../Components/Modals/Scenarios/ScenarioSettingsModal';
import { ScenarioSettingsProvider } from '../../Providers/Services/ScenarioSettingsProvider';
import { Service } from '../../Models/Services/Services';
import { MethodsProvider } from '../../Providers/Results/MethodsProvider';

type ScenariosListViewProps = {
  service: Service;
  scenarios: Scenario[];
};

const ScenariosListView: FC<ScenariosListViewProps> = (props) => {
  const { service, scenarios } = props;
  const { loading, getScenarios } = useScenarios();
  const [scenario, setScenario] = useState<null | Scenario>(null);
  const [scenarioDetailsModal, setScenarioDetailsModal] = useState(false);
  const [scenarioSettingsModal, setScenarioSettingsModal] = useState(false);

  useEffect(() => {
    service.name && getScenarios({ service: service.name });
  }, [service.name]);

  const onScenarioDetails = (scenario: Scenario) => {
    setScenario(scenario);
    setScenarioDetailsModal(true);
  };

  const onScenarioSettings = (scenario: Scenario) => {
    setScenario(scenario);
    setScenarioSettingsModal(true);
  };

  return (
    <WidgetView sx={{ mt: 3 }} title={'Scenarios'} loading={loading.getScenarios}>
      {scenarios.length === 0 && !loading.getSettingsScenarios && (
        <EmptyView
          title={'There is no scenarios'}
          description={'Scenarios will be displayed here when some results will be uploaded to system'}
        />
      )}
      <List>
        {scenarios.map((item, index) => (
          <ScenarioListItem
            key={index}
            selected={false}
            scenario={item}
            onScenarioDetails={onScenarioDetails}
            onScenarioSettings={onScenarioSettings}
          />
        ))}
      </List>
      {scenario && (
        <ScenarioDetailsModal
          modal={scenarioDetailsModal}
          setModal={setScenarioDetailsModal}
          scenarioName={scenario.name}
        />
      )}
      {scenario && (
        <ScenarioSettingsProvider>
          <MethodsProvider>
            <ScenarioSettingsModal
              modal={scenarioSettingsModal}
              setModal={setScenarioSettingsModal}
              scenarioName={scenario.name}
            />
          </MethodsProvider>
        </ScenarioSettingsProvider>
      )}
    </WidgetView>
  );
};

const getState = (state: ReduxState) => ({
  service: state.services.service,
  scenarios: state.scenarios.scenarios
});
export default connect(getState)(ScenariosListView);
