import { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { GetMethodsAnalyticsQuery } from '../../../Models/Analytics/MethodsAnalytics';
import { ReduxState } from '../../../Redux/ReduxState';
import { ChartWidgetType, DashboardMethodsChartsData } from '../../../Models/Core/ChartSettings';
import { AnalyticsFilters } from '../../../Components/Modals/Analytics/AnalyticsFiltersModal';
import { Service } from '../../../Models/Services/Services';
import { Scenario } from '../../../Models/Services/Scenarios';
import { MetricKey } from '../../../Models/Metrics/Base';
import MethodsAnalyticsResponseTimesChartView from './MethodsAnalyticsResponseTimesChartView';
import MethodsAnalyticsNumberOfRequestsChartView from './MethodsAnalyticsNumberOfRequestsChartView';
import MethodsAnalyticsRequestsPerSecondChartView from './MethodsAnalyticsRequestsPerSecondChartView';
import { ChartsWidgetView, MapKeyToChartViewProps } from '../../../Components/Views/ChartsWidgetView';
import { MethodsAnalyticsLoading, useMethodsAnalytics } from '../../../Providers/Analytics/MethodsAnalyticsProvider';

type Props = {
  filters: AnalyticsFilters;
  service: Service;
  scenario: Scenario;
};

const MAP_METRIC_KEY_TO_CHART_VIEW: MapKeyToChartViewProps<
  DashboardMethodsChartsData,
  { loading: MethodsAnalyticsLoading }
> = {
  [MetricKey.MinResponseTime]: (props) => (
    <MethodsAnalyticsResponseTimesChartView {...props} metric={MetricKey.MinResponseTime} />
  ),
  [MetricKey.MaxResponseTime]: (props) => (
    <MethodsAnalyticsResponseTimesChartView {...props} metric={MetricKey.MaxResponseTime} />
  ),
  [MetricKey.MedianResponseTime]: (props) => (
    <MethodsAnalyticsResponseTimesChartView {...props} metric={MetricKey.MedianResponseTime} />
  ),
  [MetricKey.AverageResponseTime]: (props) => (
    <MethodsAnalyticsResponseTimesChartView {...props} metric={MetricKey.AverageResponseTime} />
  ),
  [MetricKey.NumberOfRequests]: (props) => (
    <MethodsAnalyticsNumberOfRequestsChartView {...props} metric={MetricKey.NumberOfRequests} />
  ),
  [MetricKey.NumberOfFailures]: (props) => (
    <MethodsAnalyticsNumberOfRequestsChartView {...props} metric={MetricKey.NumberOfFailures} />
  ),
  [MetricKey.RequestsPerSecond]: (props) => (
    <MethodsAnalyticsRequestsPerSecondChartView {...props} metric={MetricKey.RequestsPerSecond} />
  ),
  [MetricKey.FailuresPerSecond]: (props) => (
    <MethodsAnalyticsRequestsPerSecondChartView {...props} metric={MetricKey.FailuresPerSecond} />
  )
};

const DashboardMethodsChartsView: FC<Props> = ({ filters, service, scenario }) => {
  const { loading, getResponseTimesAnalytics, getNumberOfRequestsAnalytics, getRequestsPerSecondAnalytics } =
    useMethodsAnalytics();

  useEffect(() => {
    const query: GetMethodsAnalyticsQuery = { ...filters, serviceId: service.id, scenarioId: scenario.id };

    Promise.any([
      getResponseTimesAnalytics(query),
      getNumberOfRequestsAnalytics(query),
      getRequestsPerSecondAnalytics(query)
    ]);
  }, [filters, service.id, scenario.id]);

  return (
    <ChartsWidgetView
      type={ChartWidgetType.DashboardMethodsCharts}
      title={'Distribution by method charts'}
      extra={{ loading }}
      views={MAP_METRIC_KEY_TO_CHART_VIEW}
    />
  );
};

const getState = (state: ReduxState) => ({
  service: state.services.service,
  scenario: state.scenarios.scenario
});
export default connect(getState)(DashboardMethodsChartsView);
