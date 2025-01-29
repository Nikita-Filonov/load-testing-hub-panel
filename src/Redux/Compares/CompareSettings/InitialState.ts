import { CompareSettings } from '../../../Models/Compares/CompareSettings';
import { CompareWidgetSettings, CompareWidgetType } from '../../../Models/Compares/CompareTableSettings';
import { getDefaultCompareSettingsWeights } from '../../../Services/Compares/Utils';
import { getDefaultCompareWidgetSettings } from '../../../Services/Compare/Utils';

export type CompareSettingsInitialState = {
  compareSettings: CompareSettings;
  compareWidgetsSettings: { [x in CompareWidgetType]: CompareWidgetSettings };
};

export const INITIAL_COMPARE_SETTINGS: CompareSettingsInitialState = {
  compareSettings: {
    serviceId: 0,
    weights: getDefaultCompareSettingsWeights(),
    highlightThreshold: {
      compareWithAverage: 0,
      compareWithPrevious: 0,
      compareResultWithResults: 0,
      compareResultWithAverages: 0,
      compareResultWithScenario: 0,
      compareMethodWithScenario: 0,
      compareAveragesWithScenario: 0
    }
  },
  compareWidgetsSettings: {
    [CompareWidgetType.CompareResultWithResults]: getDefaultCompareWidgetSettings(),
    [CompareWidgetType.CompareResultWithAverages]: getDefaultCompareWidgetSettings(),
    [CompareWidgetType.CompareResultWithScenario]: getDefaultCompareWidgetSettings(),
    [CompareWidgetType.CompareMethodWithScenario]: getDefaultCompareWidgetSettings(),
    [CompareWidgetType.CompareAveragesWithScenario]: getDefaultCompareWidgetSettings(),
    [CompareWidgetType.CompareResultWithResultsAverageSummary]: getDefaultCompareWidgetSettings()
  }
};
