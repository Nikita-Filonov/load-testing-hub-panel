import { RequestsPerSecondAnalytics } from '../../Models/Analytics/RequestsPerSecondAnalytics';
import { NumberOfRequestsAnalytics } from '../../Models/Analytics/NumberOfRequestsAnalytics';
import { ResponseTimesAnalytics } from '../../Models/Analytics/ResponseTimesAnalytics';
import { AverageAnalytics, AverageAnalyticsScenarioCompare } from '../../Models/Analytics/AverageAnalytics';

export type AnalyticsInitialState = {
  averageAnalytics: AverageAnalytics;
  averageAnalyticsScenarioCompare: AverageAnalyticsScenarioCompare;
  methodsResponseTimesAnalytics: ResponseTimesAnalytics[];
  methodsNumberOfRequestsAnalytics: NumberOfRequestsAnalytics[];
  methodsRequestsPerSecondAnalytics: RequestsPerSecondAnalytics[];
  resultsResponseTimesAnalytics: ResponseTimesAnalytics[];
  resultsNumberOfRequestsAnalytics: NumberOfRequestsAnalytics[];
  resultsRequestsPerSecondAnalytics: RequestsPerSecondAnalytics[];
};

export const INITIAL_ANALYTICS: AnalyticsInitialState = {
  averageAnalytics: {
    totalRequests: 0,
    totalFailures: 0,
    numberOfUsers: 0,
    maxResponseTime: 0,
    minResponseTime: 0,
    averageResponseTime: 0,
    totalRequestsPerSecond: 0,
    totalFailuresPerSecond: 0
  },
  averageAnalyticsScenarioCompare: {
    totalRequestsPerSecond: 0,
    totalRequestsPerSecondCompare: 0,
    scenarioTotalRequestsPerSecond: 0
  },
  methodsResponseTimesAnalytics: [],
  methodsNumberOfRequestsAnalytics: [],
  methodsRequestsPerSecondAnalytics: [],
  resultsResponseTimesAnalytics: [],
  resultsNumberOfRequestsAnalytics: [],
  resultsRequestsPerSecondAnalytics: []
};
