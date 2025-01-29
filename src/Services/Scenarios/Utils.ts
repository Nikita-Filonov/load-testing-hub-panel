import { CreateScenarioRequest, Scenario, UpdateScenarioRequest } from '../../Models/Services/Scenarios';
import {
  ScenarioMethodSettings,
  ScenarioResultSettings,
  UpdateScenarioSettingsRequest
} from '../../Models/Services/ScenarioSettings';
import { getDefaultMetrics } from '../Metrics/Base';
import { getDefaultNumberOfUsers } from '../Metrics/NumberOfUsers';
import { getDefaultContentLength } from '../Metrics/ContentLength';

export const getDefaultUpdateScenarioRequest = (): UpdateScenarioRequest => ({
  name: '',
  file: '',
  tags: [],
  version: '',
  ratioTotal: [],
  ratioPerClass: [],
  numberOfUsers: 0,
  runtimeDuration: ''
});

export const getDefaultCreateScenarioRequest = (): CreateScenarioRequest => {
  return {
    ...getDefaultUpdateScenarioRequest(),
    serviceId: 0
  };
};

export const getDefaultScenarioResultSettings = (): ScenarioResultSettings => ({
  ...getDefaultMetrics(),
  ...getDefaultNumberOfUsers()
});

export const getDefaultScenarioMethodSettings = (): ScenarioMethodSettings => ({
  method: '',
  ...getDefaultMetrics(),
  ...getDefaultContentLength()
});

export const getDefaultUpdateScenarioSettingsRequest = (): UpdateScenarioSettingsRequest => ({
  resultSettings: getDefaultScenarioResultSettings(),
  methodsSettings: []
});

export const getScenarioTitle = (scenario: Scenario): string => `#${scenario.id} ${scenario.name}`;
