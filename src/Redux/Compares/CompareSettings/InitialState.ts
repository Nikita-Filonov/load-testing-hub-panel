import { CompareSettings } from '../../../Models/Compares/CompareSettings';
import {
  CompareTableSettings,
  CompareWidgetSettings,
  CompareWidgetType
} from '../../../Models/Compares/CompareTableSettings';
import { MetricName } from '../../../Services/Constants/Metrics';
import { LoadTestResultCompare, MethodResultCompare } from '../../../Models/Compares/Compares';

export type CompareSettingsInitialState = {
  compareSettings: CompareSettings;
  compareWidgetsSettings: { [x in CompareWidgetType]: CompareWidgetSettings };
};

const DEFAULT_LOAD_TEST_RESULT_COMPARE_TABLE_SETTINGS: CompareTableSettings<LoadTestResultCompare> = {
  rows: [
    { index: 0, enabled: true, metricName: MetricName.NumberOfRequests, metricValue: 'numberOfRequests' },
    { index: 1, enabled: true, metricName: MetricName.NumberOfFailures, metricValue: 'numberOfFailures' },
    { index: 2, enabled: true, metricName: MetricName.ResponseTime, metricValue: 'responseTime' },
    { index: 3, enabled: true, metricName: MetricName.MinResponseTime, metricValue: 'minResponseTime' },
    { index: 4, enabled: true, metricName: MetricName.MaxResponseTime, metricValue: 'maxResponseTime' },
    { index: 5, enabled: true, metricName: MetricName.RequestsPerSecond, metricValue: 'requestsPerSecond' },
    { index: 6, enabled: true, metricName: MetricName.FailuresPerSecond, metricValue: 'failuresPerSecond' },
    { index: 7, enabled: true, metricName: MetricName.NumberOfUsers, metricValue: 'numberOfUsers' }
  ]
};

const DEFAULT_METHOD_RESULTS_COMPARE_TABLE_SETTINGS: CompareTableSettings<MethodResultCompare> = {
  rows: [
    { index: 0, enabled: true, metricName: MetricName.NumberOfRequests, metricValue: 'numberOfRequests' },
    { index: 1, enabled: true, metricName: MetricName.NumberOfFailures, metricValue: 'numberOfFailures' },
    { index: 2, enabled: true, metricName: MetricName.ResponseTime, metricValue: 'responseTime' },
    { index: 3, enabled: true, metricName: MetricName.MinResponseTime, metricValue: 'minResponseTime' },
    { index: 4, enabled: true, metricName: MetricName.MaxResponseTime, metricValue: 'maxResponseTime' },
    { index: 5, enabled: true, metricName: MetricName.RequestsPerSecond, metricValue: 'requestsPerSecond' },
    { index: 6, enabled: true, metricName: MetricName.FailuresPerSecond, metricValue: 'failuresPerSecond' },
    { index: 7, enabled: true, metricName: MetricName.ContentLength, metricValue: 'contentLength' }
  ]
};

const DEFAULT_COMPARE_WIDGET_SETTINGS: CompareWidgetSettings = {
  methodResultCompareTable: DEFAULT_METHOD_RESULTS_COMPARE_TABLE_SETTINGS,
  methodResultsCompareTable: DEFAULT_METHOD_RESULTS_COMPARE_TABLE_SETTINGS,
  loadTestResultCompareTable: DEFAULT_LOAD_TEST_RESULT_COMPARE_TABLE_SETTINGS
};

export const INITIAL_COMPARE_SETTINGS: CompareSettingsInitialState = {
  compareSettings: {
    serviceId: 0,
    responseTimeWeight: 0,
    minResponseTimeWeight: 0,
    maxResponseTimeWeight: 0,
    numberOfRequestsWeight: 0,
    numberOfFailuresWeight: 0,
    requestsPerSecondWeight: 0,
    failuresPerSecondWeight: 0
  },
  compareWidgetsSettings: {
    [CompareWidgetType.CompareResultWithResults]: DEFAULT_COMPARE_WIDGET_SETTINGS,
    [CompareWidgetType.CompareResultWithAverages]: DEFAULT_COMPARE_WIDGET_SETTINGS,
    [CompareWidgetType.CompareResultWithScenario]: DEFAULT_COMPARE_WIDGET_SETTINGS,
    [CompareWidgetType.CompareMethodWithScenario]: DEFAULT_COMPARE_WIDGET_SETTINGS,
    [CompareWidgetType.CompareAveragesWithScenario]: DEFAULT_COMPARE_WIDGET_SETTINGS,
    [CompareWidgetType.CompareResultWithResultsAverageSummary]: DEFAULT_COMPARE_WIDGET_SETTINGS
  }
};
