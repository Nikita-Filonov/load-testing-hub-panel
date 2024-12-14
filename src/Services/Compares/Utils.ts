import { CompareSettings, UpdateCompareSettingsRequest } from '../../Models/Compares/CompareSettings';
import { CompareTableRowSettings } from '../../Models/Compares/CompareTableSettings';
import { BaseCompare } from '../../Models/Compares/Compares';

export const sumCompareSettingsMetrics = (settings: CompareSettings | UpdateCompareSettingsRequest): number => {
  return [
    settings.responseTimeWeight,
    settings.minResponseTimeWeight,
    settings.maxResponseTimeWeight,
    settings.numberOfRequestsWeight,
    settings.numberOfFailuresWeight,
    settings.requestsPerSecondWeight,
    settings.failuresPerSecondWeight
  ].reduce((sum, value) => sum + value, 0);
};

export const sortCompareTableRowSettings = <T extends BaseCompare>(
  a: CompareTableRowSettings<T>,
  b: CompareTableRowSettings<T>
) => a.index - b.index;

export const filterEnabledCompareTableRowSettings = <T extends BaseCompare>(row: CompareTableRowSettings<T>) =>
  row.enabled;
