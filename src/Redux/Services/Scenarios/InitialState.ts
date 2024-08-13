import { Scenario, ScenarioDetails } from '../../../Models/Services/Scenarios';
import { ScenarioSettings } from '../../../Models/Services/ScenarioSettings';

export type ScenariosInitialState = {
  scenario: Scenario;
  scenarios: Scenario[];
  settingsScenarios: Scenario[];
  scenarioDetails: ScenarioDetails;
  scenarioSettings: ScenarioSettings;
};

export const INITIAL_SCENARIOS: ScenariosInitialState = {
  scenario: {
    name: '',
    file: ''
  },
  scenarios: [],
  settingsScenarios: [],
  scenarioDetails: {
    name: '',
    file: '',
    service: '',
    ratioTotal: [],
    ratioPerClass: []
  },
  scenarioSettings: {
    scenario: '',
    requestsPerSecond: 0,

    methodsSettings: []
  }
};
