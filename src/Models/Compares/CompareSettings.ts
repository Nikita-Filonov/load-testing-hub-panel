export interface CompareSettingsWeights {
  responseTime: number;
  minResponseTime: number;
  maxResponseTime: number;
  numberOfRequests: number;
  numberOfFailures: number;
  requestsPerSecond: number;
  failuresPerSecond: number;
}

export interface CompareSettingsHighlightThreshold {
  compareWithAverage: number;
  compareWithPrevious: number;
  compareResultWithResults: number;
  compareResultWithAverages: number;
  compareResultWithScenario: number;
  compareMethodWithScenario: number;
  compareAveragesWithScenario: number;
}

export interface CompareSettings {
  serviceId: number;
  weights: CompareSettingsWeights;
  highlightThreshold: CompareSettingsHighlightThreshold;
}

export interface UpdateCompareSettingsRequest {
  weights?: CompareSettingsWeights;
  highlightThreshold?: CompareSettingsHighlightThreshold;
}

export interface GetCompareSettingsResponse {
  settings: CompareSettings;
}
