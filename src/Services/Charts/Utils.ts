import dayjs from 'dayjs';
import { SettingsManager } from '../Config';
import {
  ChartSettings,
  ChartType,
  ChartWidgetDisplaySettings,
  ChartWidgetSettings,
  ChartWidgetType,
  CompareResultsHistoryChartsData,
  CoreChartSettings,
  CoreChartWidgetSettings,
  NumberOfRequestsLineChartSettings,
  NumberOfUsersLineChartSettings,
  PercentilesLineChartSettings,
  RequestsPerSecondLineChartSettings,
  ResponseTimesLineChartSettings,
  YAxisSettings
} from '../../Models/Core/ChartSettings';
import { blue, green, purple, red, yellow } from '@mui/material/colors';
import { MetricKey, MetricName } from '../../Models/Metrics/Base';
import { LineChartYAxis } from '../../Components/Charts/Models';
import { Datetime } from '../../Models/Datetime';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

type MapChartYAxisDataProps<Data> = {
  data: Data[];
  settings: ChartSettings<Data>;
} & Pick<LineChartYAxis, 'valueFormatter'>;

export const timeValueFormatter = (value: Date): string => dayjs(value).format(SettingsManager.apiTimeFormat);

export const dateTimeValueFormatter = (value: Date): string => dayjs(value).format(SettingsManager.apiDateTimeFormat);

export const msValueFormatter = (value: number | null) => (value ? `${value} ms` : 'unknown');

export const sortYAxisSettings = (a: YAxisSettings<never>, b: YAxisSettings<never>) => a.index - b.index;

export const filterEnabledYAxisSettings = (header: YAxisSettings<never>) => header.enabled;

export const mapChartYAxisData = <Data>({ data, settings, valueFormatter }: MapChartYAxisDataProps<Data>) =>
  settings.yAxis
    .filter(filterEnabledYAxisSettings)
    .map((axis) => ({ data: data.map((result) => result[axis.value]), valueFormatter, ...axis }));

export const sortChartWidgetDisplaySettings = (
  a: ChartWidgetDisplaySettings<never>,
  b: ChartWidgetDisplaySettings<never>
) => a.index - b.index;

export const filterEnabledChartWidgetDisplaySettings = (header: ChartWidgetDisplaySettings<never>) => header.enabled;

export const sliceRangeData = <Data>({ data, range }: { data: Data[]; range: number[] }) =>
  data.slice(range[0], range[1] + 1);

export const getDurationFromDatetimeData = <Data extends Datetime>(data: Data[]) => {
  const startDate = dayjs(data[0].datetime);
  const endDate = dayjs(data[data.length - 1].datetime);
  const duration = dayjs.duration(endDate.diff(startDate, 'seconds'), 'seconds');

  return {
    endTime: endDate.format(SettingsManager.apiTimeFormat),
    endDateTime: endDate.format(SettingsManager.apiDateTimeFormat),
    startTime: startDate.format(SettingsManager.apiTimeFormat),
    startDateTime: startDate.format(SettingsManager.apiDateTimeFormat),
    duration: duration.format(SettingsManager.durationFormat)
  };
};

const getDefaultPercentilesLineChartSettings = (): PercentilesLineChartSettings => ({
  yAxis: [
    {
      index: 0,
      value: 'responseTimePercentile50',
      color: purple['200'],
      label: MetricName.ResponseTimePercentile50,
      enabled: true
    },
    {
      index: 1,
      value: 'responseTimePercentile60',
      color: purple['300'],
      label: MetricName.ResponseTimePercentile60,
      enabled: true
    },
    {
      index: 2,
      value: 'responseTimePercentile70',
      color: purple['400'],
      label: MetricName.ResponseTimePercentile70,
      enabled: true
    },
    {
      index: 3,
      value: 'responseTimePercentile80',
      color: purple['500'],
      label: MetricName.ResponseTimePercentile80,
      enabled: true
    },
    {
      index: 4,
      value: 'responseTimePercentile90',
      color: purple['600'],
      label: MetricName.ResponseTimePercentile90,
      enabled: true
    },
    {
      index: 5,
      value: 'responseTimePercentile95',
      color: purple['700'],
      label: MetricName.ResponseTimePercentile95,
      enabled: true
    },
    {
      index: 6,
      value: 'responseTimePercentile99',
      color: purple['800'],
      label: MetricName.ResponseTimePercentile99,
      enabled: true
    },
    {
      index: 7,
      value: 'responseTimePercentile100',
      color: purple['900'],
      label: MetricName.ResponseTimePercentile100,
      enabled: true
    }
  ]
});

const getDefaultResponseTimesLineChartSettings = (): ResponseTimesLineChartSettings => ({
  yAxis: [
    {
      index: 0,
      value: MetricKey.AverageResponseTime,
      color: yellow['600'],
      label: MetricName.AverageResponseTime,
      enabled: true
    },
    {
      index: 1,
      value: MetricKey.MedianResponseTime,
      color: blue['500'],
      label: MetricName.MedianResponseTime,
      enabled: true
    },
    {
      index: 2,
      value: MetricKey.MinResponseTime,
      color: green['400'],
      label: MetricName.MinResponseTime,
      enabled: true
    },
    {
      index: 3,
      value: MetricKey.MaxResponseTime,
      color: red['400'],
      label: MetricName.MaxResponseTime,
      enabled: true
    }
  ]
});

const getDefaultNumberOfUsersLineChartSettings = (): NumberOfUsersLineChartSettings => ({
  yAxis: [
    {
      index: 0,
      value: MetricKey.NumberOfUsers,
      color: blue['400'],
      label: MetricName.NumberOfUsers,
      enabled: true
    }
  ]
});

export const getDefaultNumberOfRequestsLineChartSettings = (): NumberOfRequestsLineChartSettings => ({
  yAxis: [
    {
      index: 0,
      value: MetricKey.NumberOfRequests,
      color: green['500'],
      label: MetricName.NumberOfRequests,
      enabled: true
    },
    {
      index: 1,
      value: MetricKey.NumberOfFailures,
      color: red['300'],
      label: MetricName.NumberOfFailures,
      enabled: true
    }
  ]
});

const getDefaultRequestsPerSecondLineChartSettings = (): RequestsPerSecondLineChartSettings => ({
  yAxis: [
    {
      index: 0,
      value: MetricKey.RequestsPerSecond,
      color: green['500'],
      label: MetricName.RequestsPerSecond,
      enabled: true
    },
    {
      index: 1,
      value: MetricKey.FailuresPerSecond,
      color: red['300'],
      label: MetricName.FailuresPerSecond,
      enabled: true
    }
  ]
});

export const getDefaultCoreChartSettings = (): CoreChartSettings => ({
  [ChartType.MethodPercentilesBarChart]: getDefaultPercentilesLineChartSettings(),
  [ChartType.MethodResponseTimesBarChart]: getDefaultResponseTimesLineChartSettings(),
  [ChartType.MethodNumberOfRequestsBarChart]: getDefaultNumberOfRequestsLineChartSettings(),
  [ChartType.MethodRequestsPerSecondBarChart]: getDefaultRequestsPerSecondLineChartSettings(),

  [ChartType.DashboardPercentilesBarChart]: getDefaultPercentilesLineChartSettings(),
  [ChartType.DashboardResponseTimesBarChart]: getDefaultResponseTimesLineChartSettings(),
  [ChartType.DashboardNumberOfRequestsBarChart]: getDefaultNumberOfRequestsLineChartSettings(),
  [ChartType.DashboardRequestsPerSecondBarChart]: getDefaultRequestsPerSecondLineChartSettings(),

  [ChartType.MethodResultsHistoryPercentilesLineChart]: getDefaultPercentilesLineChartSettings(),
  [ChartType.MethodResultsHistoryResponseTimesLineChart]: getDefaultResponseTimesLineChartSettings(),
  [ChartType.MethodResultsHistoryNumberOfUsersLineChart]: getDefaultNumberOfUsersLineChartSettings(),
  [ChartType.MethodResultsHistoryNumberOfRequestsLineChart]: getDefaultNumberOfRequestsLineChartSettings(),
  [ChartType.MethodResultsHistoryRequestsPerSecondLineChart]: getDefaultRequestsPerSecondLineChartSettings(),

  [ChartType.LoadTestResultsHistoryPercentilesLineChart]: getDefaultPercentilesLineChartSettings(),
  [ChartType.LoadTestResultsHistoryResponseTimesLineChart]: getDefaultResponseTimesLineChartSettings(),
  [ChartType.LoadTestResultsHistoryNumberOfUsersLineChart]: getDefaultNumberOfUsersLineChartSettings(),
  [ChartType.LoadTestResultsHistoryNumberOfRequestsLineChart]: getDefaultNumberOfRequestsLineChartSettings(),
  [ChartType.LoadTestResultsHistoryRequestsPerSecondLineChart]: getDefaultRequestsPerSecondLineChartSettings()
});

const getDefaultChartWidgetSettingsCompareResultsHistoryChartsData =
  (): ChartWidgetSettings<CompareResultsHistoryChartsData> => ({
    charts: [
      { key: MetricKey.RequestsPerSecond, index: 0, title: MetricName.RequestsPerSecond, enabled: true },
      { key: MetricKey.FailuresPerSecond, index: 1, title: MetricName.FailuresPerSecond, enabled: false },
      { key: MetricKey.AverageResponseTime, index: 2, title: MetricName.AverageResponseTime, enabled: true },
      { key: MetricKey.MedianResponseTime, index: 3, title: MetricName.MedianResponseTime, enabled: false },
      { key: MetricKey.MinResponseTime, index: 4, title: MetricName.MinResponseTime, enabled: false },
      { key: MetricKey.MaxResponseTime, index: 5, title: MetricName.MaxResponseTime, enabled: false },
      { key: MetricKey.NumberOfRequests, index: 6, title: MetricName.NumberOfRequests, enabled: false },
      { key: MetricKey.NumberOfFailures, index: 7, title: MetricName.NumberOfFailures, enabled: false },
      { key: MetricKey.NumberOfUsers, index: 8, title: MetricName.NumberOfUsers, enabled: true }
    ]
  });

export const getDefaultCoreChartWidgetSettings = (): CoreChartWidgetSettings => ({
  [ChartWidgetType.DashboardMethodsCharts]: {
    charts: [
      { key: MetricKey.AverageResponseTime, index: 0, title: MetricName.AverageResponseTime, enabled: true },
      { key: MetricKey.MedianResponseTime, index: 1, title: MetricName.MedianResponseTime, enabled: false },
      { key: MetricKey.MinResponseTime, index: 2, title: MetricName.MinResponseTime, enabled: false },
      { key: MetricKey.MaxResponseTime, index: 3, title: MetricName.MaxResponseTime, enabled: false },
      { key: MetricKey.NumberOfRequests, index: 4, title: MetricName.NumberOfRequests, enabled: true },
      { key: MetricKey.NumberOfFailures, index: 5, title: MetricName.NumberOfFailures, enabled: false },
      { key: MetricKey.RequestsPerSecond, index: 6, title: MetricName.RequestsPerSecond, enabled: true },
      { key: MetricKey.FailuresPerSecond, index: 7, title: MetricName.FailuresPerSecond, enabled: false }
    ]
  },
  [ChartWidgetType.CompareMethodResultsHistoryCharts]: getDefaultChartWidgetSettingsCompareResultsHistoryChartsData(),
  [ChartWidgetType.CompareLoadTestResultsHistoryCharts]: getDefaultChartWidgetSettingsCompareResultsHistoryChartsData()
});
