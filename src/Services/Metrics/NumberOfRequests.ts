import { NumberOfRequests } from '../../Models/Metrics/NumberOfRequests';

export const getDefaultNumberOfRequests = (): NumberOfRequests => ({
  numberOfRequests: 0,
  numberOfFailures: 0
});
