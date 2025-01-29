import { Metrics } from '../Metrics/Base';
import { NumberOfUsers } from '../Metrics/NumberOfUsers';

export interface AverageAnalytics extends Metrics, NumberOfUsers {}

export interface GetAverageAnalyticsResponse {
  analytics: AverageAnalytics;
}
