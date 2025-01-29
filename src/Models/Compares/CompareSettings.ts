import { Metrics } from '../Metrics/Base';
import { ContentLength } from '../Metrics/ContentLength';
import { NumberOfUsers } from '../Metrics/NumberOfUsers';

export interface CompareSettingsWeights extends Metrics, ContentLength, NumberOfUsers {}

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
