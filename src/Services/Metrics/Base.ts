import { Metrics } from '../../Models/Metrics/Base';
import { getDefaultPercentiles } from './Percentiles';
import { getDefaultResponseTimes } from './ResponseTimes';
import { getDefaultNumberOfRequests } from './NumberOfRequests';
import { getDefaultRequestsPerSecond } from './RequestsPerSecond';

export const getDefaultMetrics = (): Metrics => ({
  ...getDefaultPercentiles(),
  ...getDefaultResponseTimes(),
  ...getDefaultNumberOfRequests(),
  ...getDefaultRequestsPerSecond()
});
