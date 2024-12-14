export interface ScenarioMethodSettings {
  method: string;
  responseTime: number;
  contentLength: number;
  minResponseTime: number;
  maxResponseTime: number;
  numberOfRequests: number;
  numberOfFailures: number;
  requestsPerSecond: number;
  failuresPerSecond: number;
}

export interface ScenarioSettings {
  scenarioId: number;
  responseTime: number;
  numberOfUsers: number;
  minResponseTime: number;
  maxResponseTime: number;
  numberOfRequests: number;
  numberOfFailures: number;
  requestsPerSecond: number;
  failuresPerSecond: number;

  methodsSettings: ScenarioMethodSettings[];
}

export interface UpdateScenarioSettingsRequest {
  responseTime: number;
  numberOfUsers: number;
  minResponseTime: number;
  maxResponseTime: number;
  numberOfRequests: number;
  numberOfFailures: number;
  requestsPerSecond: number;
  failuresPerSecond: number;

  methodsSettings: ScenarioMethodSettings[];
}

export interface GetScenarioSettingsResponse {
  settings: ScenarioSettings;
}
