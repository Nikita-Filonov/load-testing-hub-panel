import { GetResultsAnalyticsQuery } from './ResultsAnalytics';

export interface AverageAnalytics {
  totalRequests: number;
  totalFailures: number;
  numberOfUsers: number;
  maxResponseTime: number;
  minResponseTime: number;
  averageResponseTime: number;
  totalRequestsPerSecond: number;
  totalFailuresPerSecond: number;
}

export interface AverageAnalyticsScenarioCompare {
  totalRequestsPerSecond: number;
  totalRequestsPerSecondCompare: number;
  scenarioTotalRequestsPerSecond: number;
}

export interface GetAverageAnalyticsResponse {
  analytics: AverageAnalytics;
}

export interface GetAverageAnalyticsScenarioCompareQuery extends GetResultsAnalyticsQuery {
  scenario: string;
}

export interface GetAverageAnalyticsScenarioCompareResponse {
  compare: AverageAnalyticsScenarioCompare;
}
