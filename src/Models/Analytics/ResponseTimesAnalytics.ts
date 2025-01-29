import { ResponseTimes } from '../Metrics/ResponseTimes';
import { Datetime } from '../Datetime';

export interface ResponseTimesAnalytics extends Datetime, ResponseTimes {}

export interface GetResponseTimesAnalyticsResponse {
  analytics: ResponseTimesAnalytics[];
}
