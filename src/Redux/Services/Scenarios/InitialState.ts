import { Scenario, ScenarioDetails } from '../../../Models/Services/Scenarios';
import { ScenarioSettings } from '../../../Models/Services/ScenarioSettings';
import { getDefaultScenarioResultSettings } from '../../../Services/Scenarios/Utils';

export type ScenariosInitialState = {
  scenario: Scenario;
  scenarios: Scenario[];
  scenarioDetails: ScenarioDetails;
  scenarioSettings: ScenarioSettings;
};

const DEFAULT_SCENARIO: Scenario = {
  id: 0,
  name: '',
  tags: [],
  version: ''
};

export const INITIAL_SCENARIOS: ScenariosInitialState = {
  scenario: DEFAULT_SCENARIO,
  scenarios: [],
  scenarioDetails: {
    ...DEFAULT_SCENARIO,
    file: '',
    ratioTotal: [],
    ratioPerClass: [],
    numberOfUsers: 0,
    runtimeDuration: ''
  },
  scenarioSettings: {
    resultSettings: getDefaultScenarioResultSettings(),
    methodsSettings: []
  }
};
