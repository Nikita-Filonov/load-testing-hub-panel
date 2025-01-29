import {
  CompareTableRowSettings,
  CompareTableSettings,
  CompareWidgetSettings
} from '../../Models/Compares/CompareTableSettings';
import { BaseCompare, LoadTestResultCompare, MethodResultCompare } from '../../Models/Compares/Compares';
import { MetricName } from '../../Models/Metrics/Base';

export const getCompareTitle = ({ percent, context }: { percent?: number; context: string }): string => {
  if (percent === undefined) {
    return 'No info';
  }

  if (percent > 0) {
    return `${percent}% better than ${context}`;
  }

  if (percent < 0) {
    return `${percent}% worse than ${context}`;
  }

  return `No difference to ${context}`;
};

export const getCompareColor = (percent?: number): 'error' | 'success' | 'warning' => {
  if (percent === undefined) {
    return 'warning';
  }

  if (percent > 0) {
    return 'success';
  }

  if (percent < 0) {
    return 'error';
  }

  return 'warning';
};

export const getDefaultBaseCompareTableRowSettings = (): CompareTableRowSettings<BaseCompare>[] => [
  { index: 0, enabled: true, metricName: MetricName.NumberOfRequests, metricValue: 'numberOfRequests' },
  { index: 1, enabled: true, metricName: MetricName.NumberOfFailures, metricValue: 'numberOfFailures' },
  { index: 2, enabled: true, metricName: MetricName.AverageResponseTime, metricValue: 'averageResponseTime' },
  { index: 3, enabled: true, metricName: MetricName.MedianResponseTime, metricValue: 'medianResponseTime' },
  { index: 4, enabled: true, metricName: MetricName.MinResponseTime, metricValue: 'minResponseTime' },
  { index: 5, enabled: true, metricName: MetricName.MaxResponseTime, metricValue: 'maxResponseTime' },
  { index: 6, enabled: true, metricName: MetricName.RequestsPerSecond, metricValue: 'requestsPerSecond' },
  { index: 7, enabled: true, metricName: MetricName.FailuresPerSecond, metricValue: 'failuresPerSecond' },
  {
    index: 8,
    enabled: true,
    metricName: MetricName.ResponseTimePercentile50,
    metricValue: 'responseTimePercentile50'
  },
  {
    index: 9,
    enabled: true,
    metricName: MetricName.ResponseTimePercentile60,
    metricValue: 'responseTimePercentile60'
  },
  {
    index: 10,
    enabled: true,
    metricName: MetricName.ResponseTimePercentile70,
    metricValue: 'responseTimePercentile70'
  },
  {
    index: 11,
    enabled: true,
    metricName: MetricName.ResponseTimePercentile80,
    metricValue: 'responseTimePercentile80'
  },
  {
    index: 12,
    enabled: true,
    metricName: MetricName.ResponseTimePercentile90,
    metricValue: 'responseTimePercentile90'
  },
  {
    index: 13,
    enabled: true,
    metricName: MetricName.ResponseTimePercentile95,
    metricValue: 'responseTimePercentile95'
  },
  {
    index: 14,
    enabled: true,
    metricName: MetricName.ResponseTimePercentile99,
    metricValue: 'responseTimePercentile99'
  },
  {
    index: 15,
    enabled: true,
    metricName: MetricName.ResponseTimePercentile100,
    metricValue: 'responseTimePercentile100'
  }
];

export const getDefaultLoadTestResultCompareTableRowSettings = (): CompareTableRowSettings<LoadTestResultCompare>[] => {
  const rows = getDefaultBaseCompareTableRowSettings();

  return [
    ...rows,
    { index: rows.length, enabled: true, metricName: MetricName.NumberOfUsers, metricValue: 'numberOfUsers' }
  ];
};

export const getDefaultMethodResultCompareTableRowSettings = (): CompareTableRowSettings<MethodResultCompare>[] => {
  const rows = getDefaultBaseCompareTableRowSettings();

  return [
    ...rows,
    {
      index: rows.length,
      enabled: true,
      metricName: MetricName.AverageContentLength,
      metricValue: 'averageContentLength'
    }
  ];
};

export const defDefaultMethodResultsCompareTableSettings = (): CompareTableSettings<MethodResultCompare> => ({
  rows: getDefaultMethodResultCompareTableRowSettings()
});

export const getDefaultLoadTestResultCompareTableSettings = (): CompareTableSettings<LoadTestResultCompare> => ({
  rows: getDefaultLoadTestResultCompareTableRowSettings()
});

export const getDefaultCompareWidgetSettings = (): CompareWidgetSettings => ({
  methodResultCompareTable: defDefaultMethodResultsCompareTableSettings(),
  methodResultsCompareTable: defDefaultMethodResultsCompareTableSettings(),
  loadTestResultCompareTable: getDefaultLoadTestResultCompareTableSettings()
});
