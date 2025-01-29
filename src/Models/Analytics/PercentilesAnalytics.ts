import { Percentiles } from '../Metrics/Percentiles';
import { Datetime } from '../Datetime';

export interface PercentilesAnalytics extends Datetime, Percentiles {}

export interface GetPercentilesAnalyticsResponse {
  analytics: PercentilesAnalytics[];
}
