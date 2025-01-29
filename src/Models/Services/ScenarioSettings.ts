import { Metrics } from '../Metrics/Base';
import { NumberOfUsers } from '../Metrics/NumberOfUsers';
import { ContentLength } from '../Metrics/ContentLength';

export interface ScenarioResultSettings extends Metrics, NumberOfUsers {}

export interface ScenarioMethodSettings extends Metrics, ContentLength {
  method: string;
}

export interface ScenarioSettings {
  resultSettings: ScenarioResultSettings;
  methodsSettings: ScenarioMethodSettings[];
}

export interface UpdateScenarioSettingsRequest {
  resultSettings: ScenarioResultSettings;
  methodsSettings: ScenarioMethodSettings[];
}

export interface GetScenarioSettingsResponse {
  settings: ScenarioSettings;
}
