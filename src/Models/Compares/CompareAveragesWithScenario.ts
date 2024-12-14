import { LoadTestResultCompare } from './Compares';
import { GetResultsAnalyticsQuery } from '../Analytics/ResultsAnalytics';

export interface GetCompareAveragesWithScenarioQuery extends GetResultsAnalyticsQuery {
  scenarioId: number;
}

export interface GetCompareAveragesWithScenarioResponse {
  compare: LoadTestResultCompare;
}
