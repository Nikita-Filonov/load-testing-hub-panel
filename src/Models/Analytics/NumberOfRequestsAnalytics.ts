import { NumberOfRequests } from '../Metrics/NumberOfRequests';
import { Datetime } from '../Datetime';

export interface NumberOfRequestsAnalytics extends Datetime, NumberOfRequests {}

export interface GetNumberOfRequestsAnalyticsResponse {
  analytics: NumberOfRequestsAnalytics[];
}
