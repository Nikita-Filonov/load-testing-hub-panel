import { RequestsPerSecond } from '../../Models/Metrics/RequestsPerSecond';

export const getDefaultRequestsPerSecond = (): RequestsPerSecond => ({
  requestsPerSecond: 0,
  failuresPerSecond: 0
});
