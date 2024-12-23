import { CompareSettingsWeights } from '../../Models/Compares/CompareSettings';
import { CompareTableRowSettings } from '../../Models/Compares/CompareTableSettings';
import { BaseCompare } from '../../Models/Compares/Compares';

export const sumCompareSettingsWeights = (weights?: CompareSettingsWeights): number => {
  if (!weights) {
    return 0;
  }

  return [
    weights.responseTime,
    weights.minResponseTime,
    weights.maxResponseTime,
    weights.numberOfRequests,
    weights.numberOfFailures,
    weights.requestsPerSecond,
    weights.failuresPerSecond
  ].reduce((sum, value) => sum + value, 0);
};

export const sortCompareTableRowSettings = <T extends BaseCompare>(
  a: CompareTableRowSettings<T>,
  b: CompareTableRowSettings<T>
) => a.index - b.index;

export const filterEnabledCompareTableRowSettings = <T extends BaseCompare>(row: CompareTableRowSettings<T>) =>
  row.enabled;
