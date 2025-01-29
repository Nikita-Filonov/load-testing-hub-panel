import { RatioResult } from '../Results/RatioResults';

export enum ScenarioTag {
  Legacy = 'LEGACY',
  Latest = 'LATEST',
  Experiment = 'EXPERIMENT'
}

export interface Scenario {
  id: number;
  name: string;
  tags: ScenarioTag[];
  version: string;
}

export interface ScenarioDetails extends Scenario {
  file: string;
  ratioTotal: RatioResult[];
  ratioPerClass: RatioResult[];
  numberOfUsers: number;
  runtimeDuration: string;
}

export interface GetScenariosQuery {
  serviceId: number;
}

export interface GetScenarioResponse {
  scenario: Scenario;
}

export interface GetScenariosResponse {
  scenarios: Scenario[];
}

export interface GetScenarioDetailsResponse {
  details: ScenarioDetails;
}

export interface UpdateScenarioRequest {
  name: string;
  file: string;
  tags: ScenarioTag[];
  version: string;
  ratioTotal: RatioResult[];
  ratioPerClass: RatioResult[];
  numberOfUsers: number;
  runtimeDuration: string;
}

export interface CreateScenarioRequest extends UpdateScenarioRequest {
  serviceId: number;
}
