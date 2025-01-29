import { ResponseTimes } from '../../Models/Metrics/ResponseTimes';

export const getDefaultResponseTimes = (): ResponseTimes => ({
  minResponseTime: 0,
  maxResponseTime: 0,
  medianResponseTime: 0,
  averageResponseTime: 0
});
