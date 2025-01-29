import { Percentiles } from '../Metrics/Percentiles';
import { NumberOfUsers } from '../Metrics/NumberOfUsers';
import { NumberOfRequests } from '../Metrics/NumberOfRequests';
import { RequestsPerSecond } from '../Metrics/RequestsPerSecond';
import { ResponseTimes } from '../Metrics/ResponseTimes';
import { MetricName } from '../Metrics/Base';

export enum ChartType {
  MethodPercentilesBarChart = 'METHOD_PERCENTILES_BAR_CHART',
  MethodResponseTimesBarChart = 'METHOD_RESPONSE_TIMES_BAR_CHART',
  MethodNumberOfRequestsBarChart = 'METHOD_NUMBER_OF_REQUESTS_BAR_CHART',
  MethodRequestsPerSecondBarChart = 'METHOD_REQUESTS_PER_SECOND_BAR_CHART',

  DashboardPercentilesBarChart = 'DASHBOARD_PERCENTILES_BAR_CHART',
  DashboardResponseTimesBarChart = 'DASHBOARD_RESPONSE_TIMES_BAR_CHART',
  DashboardNumberOfRequestsBarChart = 'DASHBOARD_NUMBER_OF_REQUESTS_BAR_CHART',
  DashboardRequestsPerSecondBarChart = 'DASHBOARD_REQUESTS_PER_SECOND_BAR_CHART',

  MethodResultsHistoryPercentilesLineChart = 'METHOD_RESULTS_HISTORY_PERCENTILES_LINE_CHART',
  MethodResultsHistoryResponseTimesLineChart = 'METHOD_RESULTS_HISTORY_RESPONSE_TIMES_LINE_CHART',
  MethodResultsHistoryNumberOfUsersLineChart = 'METHOD_RESULTS_HISTORY_NUMBER_OF_USERS_LINE_CHART',
  MethodResultsHistoryNumberOfRequestsLineChart = 'METHOD_RESULTS_HISTORY_NUMBER_OF_REQUESTS_LINE_CHART',
  MethodResultsHistoryRequestsPerSecondLineChart = 'METHOD_RESULTS_HISTORY_REQUESTS_PER_SECOND_LINE_CHART',

  LoadTestResultsHistoryPercentilesLineChart = 'LOAD_TEST_RESULTS_HISTORY_PERCENTILES_LINE_CHART',
  LoadTestResultsHistoryResponseTimesLineChart = 'LOAD_TEST_RESULTS_HISTORY_RESPONSE_TIMES_LINE_CHART',
  LoadTestResultsHistoryNumberOfUsersLineChart = 'LOAD_TEST_RESULTS_HISTORY_NUMBER_OF_USERS_LINE_CHART',
  LoadTestResultsHistoryNumberOfRequestsLineChart = 'LOAD_TEST_RESULTS_HISTORY_NUMBER_OF_REQUESTS_LINE_CHART',
  LoadTestResultsHistoryRequestsPerSecondLineChart = 'LOAD_TEST_RESULTS_HISTORY_REQUESTS_PER_SECOND_LINE_CHART'
}

export enum ChartWidgetType {
  DashboardMethodsCharts = 'DASHBOARD_METHODS_CHARTS',
  CompareMethodResultsHistoryCharts = 'COMPARE_METHOD_RESULTS_HISTORY_CHARTS',
  CompareLoadTestResultsHistoryCharts = 'COMPARE_LOAD_TEST_RESULTS_HISTORY_CHARTS'
}

export interface YAxisSettings<Data> {
  index: number;
  value: keyof Data;
  label: string;
  color: string;
  enabled: boolean;
}

export interface ChartSettings<Data> {
  yAxis: YAxisSettings<Data>[];
}

export type PercentilesLineChartSettings = ChartSettings<Percentiles>;
export type NumberOfUsersLineChartSettings = ChartSettings<NumberOfUsers>;
export type ResponseTimesLineChartSettings = ChartSettings<ResponseTimes>;
export type NumberOfRequestsLineChartSettings = ChartSettings<NumberOfRequests>;
export type RequestsPerSecondLineChartSettings = ChartSettings<RequestsPerSecond>;

export interface CoreChartSettings {
  [ChartType.MethodPercentilesBarChart]: PercentilesLineChartSettings;
  [ChartType.MethodResponseTimesBarChart]: ResponseTimesLineChartSettings;
  [ChartType.MethodNumberOfRequestsBarChart]: NumberOfRequestsLineChartSettings;
  [ChartType.MethodRequestsPerSecondBarChart]: RequestsPerSecondLineChartSettings;

  [ChartType.DashboardPercentilesBarChart]: PercentilesLineChartSettings;
  [ChartType.DashboardResponseTimesBarChart]: ResponseTimesLineChartSettings;
  [ChartType.DashboardNumberOfRequestsBarChart]: NumberOfRequestsLineChartSettings;
  [ChartType.DashboardRequestsPerSecondBarChart]: RequestsPerSecondLineChartSettings;

  [ChartType.MethodResultsHistoryPercentilesLineChart]: PercentilesLineChartSettings;
  [ChartType.MethodResultsHistoryResponseTimesLineChart]: ResponseTimesLineChartSettings;
  [ChartType.MethodResultsHistoryNumberOfUsersLineChart]: NumberOfUsersLineChartSettings;
  [ChartType.MethodResultsHistoryNumberOfRequestsLineChart]: NumberOfRequestsLineChartSettings;
  [ChartType.MethodResultsHistoryRequestsPerSecondLineChart]: RequestsPerSecondLineChartSettings;

  [ChartType.LoadTestResultsHistoryPercentilesLineChart]: PercentilesLineChartSettings;
  [ChartType.LoadTestResultsHistoryResponseTimesLineChart]: ResponseTimesLineChartSettings;
  [ChartType.LoadTestResultsHistoryNumberOfUsersLineChart]: NumberOfUsersLineChartSettings;
  [ChartType.LoadTestResultsHistoryNumberOfRequestsLineChart]: NumberOfRequestsLineChartSettings;
  [ChartType.LoadTestResultsHistoryRequestsPerSecondLineChart]: RequestsPerSecondLineChartSettings;
}

export interface ChartWidgetDisplaySettings<Data> {
  key: keyof Data;
  index: number;
  title: MetricName;
  enabled: boolean;
}

export interface ChartWidgetSettings<Data> {
  charts: ChartWidgetDisplaySettings<Data>[];
}

export type DashboardMethodsChartsData = ResponseTimes & NumberOfRequests & RequestsPerSecond;
export type CompareResultsHistoryChartsData = ResponseTimes & NumberOfUsers & NumberOfRequests & RequestsPerSecond;

export interface CoreChartWidgetSettings {
  [ChartWidgetType.DashboardMethodsCharts]: ChartWidgetSettings<DashboardMethodsChartsData>;
  [ChartWidgetType.CompareMethodResultsHistoryCharts]: ChartWidgetSettings<CompareResultsHistoryChartsData>;
  [ChartWidgetType.CompareLoadTestResultsHistoryCharts]: ChartWidgetSettings<CompareResultsHistoryChartsData>;
}
