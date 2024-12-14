import { CreateScenarioRequest, Scenario, UpdateScenarioRequest } from '../../Models/Services/Scenarios';
import { UpdateScenarioSettingsRequest } from '../../Models/Services/ScenarioSettings';

export const getDefaultUpdateScenarioRequest = (): UpdateScenarioRequest => {
  return {
    name: '',
    file: '',
    tags: [],
    version: '',
    ratioTotal: [],
    ratioPerClass: []
  };
};

export const getDefaultCreateScenarioRequest = (): CreateScenarioRequest => {
  return {
    ...getDefaultUpdateScenarioRequest(),
    serviceId: 0
  };
};

export const getDefaultUpdateScenarioSettingsRequest = (): UpdateScenarioSettingsRequest => {
  return {
    responseTime: 0,
    numberOfUsers: 0,
    minResponseTime: 0,
    maxResponseTime: 0,
    numberOfRequests: 0,
    numberOfFailures: 0,
    requestsPerSecond: 0,
    failuresPerSecond: 0,
    methodsSettings: []
  };
};

export const getScenarioTitle = (scenario: Scenario): string => `#${scenario.id} ${scenario.name}`;
