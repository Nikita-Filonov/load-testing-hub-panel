import { FC, useEffect } from 'react';
import { ChartWidgetType, CompareResultsHistoryChartsData } from '../../../Models/Core/ChartSettings';
import { MetricKey } from '../../../Models/Metrics/Base';
import CompareMethodResultsHistoryResponseTimesChartView from './CompareMethodResultsHistoryResponseTimesChartView';
import CompareMethodResultsHistoryNumberOfUsersChartView from './CompareMethodResultsHistoryNumberOfUsersChartView';
import CompareMethodResultsHistoryNumberOfRequestsChartView from './CompareMethodResultsHistoryNumberOfRequestsChartView';
import CompareMethodResultsHistoryRequestsPerSecondChartView from './CompareMethodResultsHistoryRequestsPerSecondChartView';
import { ChartsWidgetView, MapKeyToChartViewProps } from '../../../Components/Views/ChartsWidgetView';
import { GetCompareMethodResultsHistoryQuery } from '../../../Models/Compares/CompareMethodResultsHistory';
import { getMethodLabel } from '../../../Services/Methods/Utils';
import {
  CompareMethodResultsHistoryLoading,
  useCompareMethodResultsHistory
} from '../../../Providers/Compares/CompareMethodResultsHistoryProvider';
import { ProtocolType } from '../../../Models/Results/MethodResults';

type Props = {
  method: string;
  protocol: ProtocolType;
  loadTestResultId: number;
  compareWithLoadTestResults: number[];
};

const MAP_METRIC_KEY_TO_CHART_VIEW: MapKeyToChartViewProps<
  CompareResultsHistoryChartsData,
  { loading: CompareMethodResultsHistoryLoading }
> = {
  [MetricKey.MinResponseTime]: (props) => (
    <CompareMethodResultsHistoryResponseTimesChartView {...props} metric={MetricKey.MinResponseTime} />
  ),
  [MetricKey.MaxResponseTime]: (props) => (
    <CompareMethodResultsHistoryResponseTimesChartView {...props} metric={MetricKey.MaxResponseTime} />
  ),
  [MetricKey.MedianResponseTime]: (props) => (
    <CompareMethodResultsHistoryResponseTimesChartView {...props} metric={MetricKey.MedianResponseTime} />
  ),
  [MetricKey.AverageResponseTime]: (props) => (
    <CompareMethodResultsHistoryResponseTimesChartView {...props} metric={MetricKey.AverageResponseTime} />
  ),
  [MetricKey.NumberOfUsers]: (props) => (
    <CompareMethodResultsHistoryNumberOfUsersChartView {...props} metric={MetricKey.NumberOfUsers} />
  ),
  [MetricKey.NumberOfRequests]: (props) => (
    <CompareMethodResultsHistoryNumberOfRequestsChartView {...props} metric={MetricKey.NumberOfRequests} />
  ),
  [MetricKey.NumberOfFailures]: (props) => (
    <CompareMethodResultsHistoryNumberOfRequestsChartView {...props} metric={MetricKey.NumberOfFailures} />
  ),
  [MetricKey.RequestsPerSecond]: (props) => (
    <CompareMethodResultsHistoryRequestsPerSecondChartView {...props} metric={MetricKey.RequestsPerSecond} />
  ),
  [MetricKey.FailuresPerSecond]: (props) => (
    <CompareMethodResultsHistoryRequestsPerSecondChartView {...props} metric={MetricKey.FailuresPerSecond} />
  )
};

export const CompareMethodResultsHistoryChartsView: FC<Props> = (props) => {
  const { method, protocol, loadTestResultId, compareWithLoadTestResults } = props;
  const {
    loading,
    getCompareMethodResultsHistoryNumberOfUsers,
    getCompareMethodResultsHistoryResponseTimes,
    getCompareMethodResultsHistoryNumberOfRequests,
    getCompareMethodResultsHistoryRequestsPerSecond
  } = useCompareMethodResultsHistory();

  useEffect(() => {
    const query: GetCompareMethodResultsHistoryQuery = { method, loadTestResultId, compareWithLoadTestResults };

    if (compareWithLoadTestResults.length > 0) {
      Promise.any([
        getCompareMethodResultsHistoryNumberOfUsers(query),
        getCompareMethodResultsHistoryResponseTimes(query),
        getCompareMethodResultsHistoryNumberOfRequests(query),
        getCompareMethodResultsHistoryRequestsPerSecond(query)
      ]);
    }
  }, [method, loadTestResultId, compareWithLoadTestResults]);

  if (compareWithLoadTestResults.length === 0) {
    return null;
  }

  return (
    <ChartsWidgetView
      type={ChartWidgetType.CompareMethodResultsHistoryCharts}
      title={`Comparison charts for ${getMethodLabel({ method, protocol })} method`}
      extra={{ loading }}
      views={MAP_METRIC_KEY_TO_CHART_VIEW}
      allowClose
    />
  );
};
