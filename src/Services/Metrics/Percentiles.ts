import { Percentiles } from '../../Models/Metrics/Percentiles';

export const getDefaultPercentiles = (): Percentiles => ({
  responseTimePercentile50: 0,
  responseTimePercentile60: 0,
  responseTimePercentile70: 0,
  responseTimePercentile80: 0,
  responseTimePercentile90: 0,
  responseTimePercentile95: 0,
  responseTimePercentile99: 0,
  responseTimePercentile100: 0
});
