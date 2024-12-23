import { MetricName } from '../../Services/Constants/Metrics';
import { BaseCompare, LoadTestResultCompare, MethodResultCompare } from './Compares';

export enum CompareWidgetType {
  CompareResultWithResults = 'COMPARE_RESULTS_WITH_RESULTS',
  CompareResultWithAverages = 'COMPARE_RESULTS_WITH_AVERAGES',
  CompareResultWithScenario = 'COMPARE_RESULTS_WITH_SCENARIO',
  CompareMethodWithScenario = 'COMPARE_METHOD_WITH_SCENARIO',
  CompareAveragesWithScenario = 'COMPARE_AVERAGES_WITH_SCENARIO',
  CompareResultWithResultsAverageSummary = 'COMPARE_RESULT_WITH_RESULTS_AVERAGE_SUMMARY'
}

export interface CompareTableRowSettings<T extends BaseCompare> {
  index: number;
  enabled: boolean;
  metricName: MetricName;
  metricValue: keyof Omit<T, 'method' | 'compare' | 'highlight'>;
}

export interface CompareTableSettings<T extends BaseCompare> {
  rows: CompareTableRowSettings<T>[];
}

export interface CompareWidgetSettings {
  methodResultCompareTable: CompareTableSettings<MethodResultCompare>;
  methodResultsCompareTable: CompareTableSettings<MethodResultCompare>;
  loadTestResultCompareTable: CompareTableSettings<LoadTestResultCompare>;
}
