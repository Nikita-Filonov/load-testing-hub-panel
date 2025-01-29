import { RequestsPerSecond } from '../Metrics/RequestsPerSecond';
import { Datetime } from '../Datetime';

export interface RequestsPerSecondAnalytics extends Datetime, RequestsPerSecond {}

export interface GetRequestsPerSecondAnalyticsResponse {
  analytics: RequestsPerSecondAnalytics[];
}
