import { Scenario, ScenarioDetails } from '../../../Models/Services/Scenarios';
import { ScenarioMethodSettings, ScenarioSettings } from '../../../Models/Services/ScenarioSettings';

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

export const DEFAULT_SCENARIO_METHOD_SETTINGS: ScenarioMethodSettings = {
  method: '',
  responseTime: 0,
  contentLength: 0,
  minResponseTime: 0,
  maxResponseTime: 0,
  numberOfRequests: 0,
  numberOfFailures: 0,
  requestsPerSecond: 0,
  failuresPerSecond: 0
};

export const INITIAL_SCENARIOS: ScenariosInitialState = {
  scenario: DEFAULT_SCENARIO,
  scenarios: [],
  scenarioDetails: {
    ...DEFAULT_SCENARIO,
    file: '',
    ratioTotal: [],
    ratioPerClass: []
  },
  scenarioSettings: {
    scenarioId: 0,
    responseTime: 0,
    numberOfUsers: 0,
    minResponseTime: 0,
    maxResponseTime: 0,
    numberOfRequests: 0,
    numberOfFailures: 0,
    requestsPerSecond: 0,
    failuresPerSecond: 0,

    methodsSettings: []
  }
};
