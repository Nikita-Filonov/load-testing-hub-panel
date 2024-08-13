export interface ScenarioMethodSettings {
  method: string;
  requestsPerSecond: number;
}

export interface ScenarioSettings {
  scenario: string;
  requestsPerSecond: number;

  methodsSettings: ScenarioMethodSettings[];
}

export interface UpdateScenarioSettingsRequest {
  settings: ScenarioSettings;
}

export interface GetScenarioSettingsResponse {
  settings: ScenarioSettings;
}
