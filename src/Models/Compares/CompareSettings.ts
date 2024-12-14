export interface CompareSettings {
  serviceId: number;
  responseTimeWeight: number;
  minResponseTimeWeight: number;
  maxResponseTimeWeight: number;
  numberOfRequestsWeight: number;
  numberOfFailuresWeight: number;
  requestsPerSecondWeight: number;
  failuresPerSecondWeight: number;
}

export interface UpdateCompareSettingsRequest {
  responseTimeWeight: number;
  minResponseTimeWeight: number;
  maxResponseTimeWeight: number;
  numberOfRequestsWeight: number;
  numberOfFailuresWeight: number;
  requestsPerSecondWeight: number;
  failuresPerSecondWeight: number;
}

export interface GetCompareSettingsResponse {
  settings: CompareSettings;
}
