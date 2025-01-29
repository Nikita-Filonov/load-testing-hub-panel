import { FC, useEffect } from 'react';
import { ChartWidgetType, CompareResultsHistoryChartsData } from '../../../Models/Core/ChartSettings';
import { MetricKey } from '../../../Models/Metrics/Base';
import CompareLoadTestResultsHistoryResponseTimesChartView from './CompareLoadTestResultsHistoryResponseTimesChartView';
import CompareLoadTestResultsHistoryNumberOfUsersChartView from './CompareLoadTestResultsHistoryNumberOfUsersChartView';
import CompareLoadTestResultsHistoryNumberOfRequestsChartView from './CompareLoadTestResultsHistoryNumberOfRequestsChartView';
import CompareLoadTestResultsHistoryRequestsPerSecondChartView from './CompareLoadTestResultsHistoryRequestsPerSecondChartView';
import { ChartsWidgetView, MapKeyToChartViewProps } from '../../../Components/Views/ChartsWidgetView';
import { GetCompareLoadTestResultsHistoryQuery } from '../../../Models/Compares/CompareLoadTestResultsHistory';
import {
  CompareLoadTestResultsHistoryLoading,
  useCompareLoadTestResultsHistory
} from '../../../Providers/Compares/CompareLoadTestResultsHistoryProvider';

type Props = {
  loadTestResultId: number;
  compareWithLoadTestResults: number[];
};

const MAP_METRIC_KEY_TO_CHART_VIEW: MapKeyToChartViewProps<
  CompareResultsHistoryChartsData,
  { loading: CompareLoadTestResultsHistoryLoading }
> = {
  [MetricKey.MinResponseTime]: (props) => (
    <CompareLoadTestResultsHistoryResponseTimesChartView {...props} metric={MetricKey.MinResponseTime} />
  ),
  [MetricKey.MaxResponseTime]: (props) => (
    <CompareLoadTestResultsHistoryResponseTimesChartView {...props} metric={MetricKey.MaxResponseTime} />
  ),
  [MetricKey.MedianResponseTime]: (props) => (
    <CompareLoadTestResultsHistoryResponseTimesChartView {...props} metric={MetricKey.MedianResponseTime} />
  ),
  [MetricKey.AverageResponseTime]: (props) => (
    <CompareLoadTestResultsHistoryResponseTimesChartView {...props} metric={MetricKey.AverageResponseTime} />
  ),
  [MetricKey.NumberOfUsers]: (props) => (
    <CompareLoadTestResultsHistoryNumberOfUsersChartView {...props} metric={MetricKey.NumberOfUsers} />
  ),
  [MetricKey.NumberOfRequests]: (props) => (
    <CompareLoadTestResultsHistoryNumberOfRequestsChartView {...props} metric={MetricKey.NumberOfRequests} />
  ),
  [MetricKey.NumberOfFailures]: (props) => (
    <CompareLoadTestResultsHistoryNumberOfRequestsChartView {...props} metric={MetricKey.NumberOfFailures} />
  ),
  [MetricKey.RequestsPerSecond]: (props) => (
    <CompareLoadTestResultsHistoryRequestsPerSecondChartView {...props} metric={MetricKey.RequestsPerSecond} />
  ),
  [MetricKey.FailuresPerSecond]: (props) => (
    <CompareLoadTestResultsHistoryRequestsPerSecondChartView {...props} metric={MetricKey.FailuresPerSecond} />
  )
};

export const CompareLoadTestResultsHistoryChartsView: FC<Props> = (props) => {
  const { loadTestResultId, compareWithLoadTestResults } = props;
  const {
    loading,
    getCompareLoadTestResultsHistoryResponseTimes,
    getCompareLoadTestResultsHistoryNumberOfUsers,
    getCompareLoadTestResultsHistoryNumberOfRequests,
    getCompareLoadTestResultsHistoryRequestsPerSecond
  } = useCompareLoadTestResultsHistory();

  useEffect(() => {
    const query: GetCompareLoadTestResultsHistoryQuery = { loadTestResultId, compareWithLoadTestResults };

    if (compareWithLoadTestResults.length > 0) {
      Promise.any([
        getCompareLoadTestResultsHistoryResponseTimes(query),
        getCompareLoadTestResultsHistoryNumberOfUsers(query),
        getCompareLoadTestResultsHistoryNumberOfRequests(query),
        getCompareLoadTestResultsHistoryRequestsPerSecond(query)
      ]);
    }
  }, [loadTestResultId, compareWithLoadTestResults]);

  if (compareWithLoadTestResults.length === 0) {
    return null;
  }

  return (
    <ChartsWidgetView
      type={ChartWidgetType.CompareLoadTestResultsHistoryCharts}
      title={'Comparison charts'}
      extra={{ loading }}
      views={MAP_METRIC_KEY_TO_CHART_VIEW}
      allowClose
      defaultClose
    />
  );
};
