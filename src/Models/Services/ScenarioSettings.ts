import { Metrics } from '../Metrics/Base';
import { NumberOfUsers } from '../Metrics/NumberOfUsers';
import { ContentLength } from '../Metrics/ContentLength';
import { ProtocolType } from '../Results/MethodResults';

export interface ScenarioResultSettings extends Metrics, NumberOfUsers {}

export interface ScenarioMethodSettings extends Metrics, ContentLength {
  method: string;
  protocol: ProtocolType;
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
