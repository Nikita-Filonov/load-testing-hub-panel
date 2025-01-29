import { RequestsPerSecondAnalytics } from '../../Models/Analytics/RequestsPerSecondAnalytics';
import { NumberOfRequestsAnalytics } from '../../Models/Analytics/NumberOfRequestsAnalytics';
import { ResponseTimesAnalytics } from '../../Models/Analytics/ResponseTimesAnalytics';
import { AverageAnalytics } from '../../Models/Analytics/AverageAnalytics';
import { PercentilesAnalytics } from '../../Models/Analytics/PercentilesAnalytics';
import { getDefaultMetrics } from '../../Services/Metrics/Base';
import { getDefaultNumberOfUsers } from '../../Services/Metrics/NumberOfUsers';
import {
  MethodsNumberOfRequestsAnalytics,
  MethodsRequestsPerSecondAnalytics,
  MethodsResponseTimesAnalytics
} from '../../Models/Analytics/MethodsAnalytics';

export type AnalyticsInitialState = {
  averageAnalytics: AverageAnalytics;
  methodsResponseTimesAnalytics: MethodsResponseTimesAnalytics[];
  methodsNumberOfRequestsAnalytics: MethodsNumberOfRequestsAnalytics[];
  methodsRequestsPerSecondAnalytics: MethodsRequestsPerSecondAnalytics[];
  resultsPercentilesAnalytics: PercentilesAnalytics[];
  resultsResponseTimesAnalytics: ResponseTimesAnalytics[];
  resultsNumberOfRequestsAnalytics: NumberOfRequestsAnalytics[];
  resultsRequestsPerSecondAnalytics: RequestsPerSecondAnalytics[];
};

export const INITIAL_ANALYTICS: AnalyticsInitialState = {
  averageAnalytics: {
    ...getDefaultMetrics(),
    ...getDefaultNumberOfUsers()
  },
  methodsResponseTimesAnalytics: [],
  methodsNumberOfRequestsAnalytics: [],
  methodsRequestsPerSecondAnalytics: [],
  resultsPercentilesAnalytics: [],
  resultsResponseTimesAnalytics: [],
  resultsNumberOfRequestsAnalytics: [],
  resultsRequestsPerSecondAnalytics: []
};
