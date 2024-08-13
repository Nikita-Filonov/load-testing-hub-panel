import { RatioResult } from '../Results/RatioResults';

export interface Scenario {
  name: string;
  file: string;
}

export interface ScenarioDetails extends Scenario {
  service: string;
  ratioTotal: RatioResult[];
  ratioPerClass: RatioResult[];
}

export interface GetScenariosQuery extends Record<string, string> {
  service: string;
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
