import { CompareSettingsWeights } from '../../Models/Compares/CompareSettings';
import { CompareTableRowSettings } from '../../Models/Compares/CompareTableSettings';
import { BaseCompare, CompareMetric, LoadTestResultCompare, MethodResultCompare } from '../../Models/Compares/Compares';
import { getDefaultMetrics } from '../Metrics/Base';
import { getDefaultContentLength } from '../Metrics/ContentLength';
import { getDefaultNumberOfUsers } from '../Metrics/NumberOfUsers';
import { ProtocolType } from '../../Models/Results/MethodResults';

export const sumCompareSettingsWeights = (weights?: CompareSettingsWeights): number => {
  if (!weights) {
    return 0;
  }

  return [
    weights.numberOfUsers,
    weights.minResponseTime,
    weights.maxResponseTime,
    weights.numberOfRequests,
    weights.numberOfFailures,
    weights.requestsPerSecond,
    weights.failuresPerSecond,
    weights.medianResponseTime,
    weights.averageResponseTime,
    weights.averageContentLength,
    weights.responseTimePercentile50,
    weights.responseTimePercentile60,
    weights.responseTimePercentile70,
    weights.responseTimePercentile80,
    weights.responseTimePercentile90,
    weights.responseTimePercentile95,
    weights.responseTimePercentile99,
    weights.responseTimePercentile100
  ].reduce((sum, value) => sum + value, 0);
};

export const sortCompareTableRowSettings = <T extends BaseCompare>(
  a: CompareTableRowSettings<T>,
  b: CompareTableRowSettings<T>
) => a.index - b.index;

export const filterEnabledCompareTableRowSettings = <T extends BaseCompare>(row: CompareTableRowSettings<T>) =>
  row.enabled;

export const getDefaultCompareSettingsWeights = (): CompareSettingsWeights => ({
  ...getDefaultMetrics(),
  ...getDefaultContentLength(),
  ...getDefaultNumberOfUsers()
});

export const getDefaultCompareMetric = (): CompareMetric => ({ actual: 0, expected: 0, compare: 0 });

export const getDefaultBaseCompare = (): BaseCompare => {
  const defaultCompareMetric = getDefaultCompareMetric();

  return {
    compare: 0,
    highlight: false,
    explanation: { formula: '', explanations: [] },
    minResponseTime: defaultCompareMetric,
    maxResponseTime: defaultCompareMetric,
    numberOfRequests: defaultCompareMetric,
    numberOfFailures: defaultCompareMetric,
    requestsPerSecond: defaultCompareMetric,
    failuresPerSecond: defaultCompareMetric,
    medianResponseTime: defaultCompareMetric,
    averageResponseTime: defaultCompareMetric,
    responseTimePercentile50: defaultCompareMetric,
    responseTimePercentile60: defaultCompareMetric,
    responseTimePercentile70: defaultCompareMetric,
    responseTimePercentile80: defaultCompareMetric,
    responseTimePercentile90: defaultCompareMetric,
    responseTimePercentile95: defaultCompareMetric,
    responseTimePercentile99: defaultCompareMetric,
    responseTimePercentile100: defaultCompareMetric
  };
};

export const getDefaultMethodResultCompare = (): MethodResultCompare => ({
  ...getDefaultBaseCompare(),
  method: '',
  protocol: ProtocolType.GRPC,
  averageContentLength: getDefaultCompareMetric()
});

export const getDefaultLoadTestResultCompare = (): LoadTestResultCompare => ({
  ...getDefaultBaseCompare(),
  numberOfUsers: getDefaultCompareMetric()
});
