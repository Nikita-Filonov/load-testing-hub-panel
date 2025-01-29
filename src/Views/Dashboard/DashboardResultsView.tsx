import { FC, Fragment, useEffect, useState } from 'react';
import { AnalyticsToolbarView } from '../Analytics/AnalyticsToolbarView';
import { useResultsAnalytics } from '../../Providers/Analytics/ResultsAnalyticsProvider';
import { connect } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import { ResponseTimesAnalytics } from '../../Models/Analytics/ResponseTimesAnalytics';
import { NumberOfRequestsAnalytics } from '../../Models/Analytics/NumberOfRequestsAnalytics';
import { RequestsPerSecondAnalytics } from '../../Models/Analytics/RequestsPerSecondAnalytics';
import { Service } from '../../Models/Services/Services';
import { GetResultsAnalyticsQuery } from '../../Models/Analytics/ResultsAnalytics';
import { AnalyticsFilters } from '../../Components/Modals/Analytics/AnalyticsFiltersModal';
import { getDefaultAnalyticsEndDatetime, getDefaultAnalyticsStartDatetime } from '../../Services/Analytics/Utils';
import AverageAnalyticsView from '../Analytics/AverageAnalyticsView';
import { AverageAnalyticsProvider } from '../../Providers/Analytics/AverageAnalyticsProvider';
import { Scenario } from '../../Models/Services/Scenarios';
import CompareAveragesWithScenarioView from '../Compares/CompareAveragesWithScenario/CompareAveragesWithScenarioView';
import { PercentilesAnalytics } from '../../Models/Analytics/PercentilesAnalytics';
import { NumberOfRequestsBarChartView } from '../../Components/Charts/Metrics/NumberOfRequestsBarChartView';
import { ResponseTimesBarChartView } from '../../Components/Charts/Metrics/ResponseTimesBarChartView';
import { RequestsPerSecondBarChartView } from '../../Components/Charts/Metrics/RequestsPerSecondBarChartView';
import { ChartType } from '../../Models/Core/ChartSettings';
import { PercentilesBarChartView } from '../../Components/Charts/Metrics/PercentilesBarChartView';
import { CompareAveragesWithScenarioProvider } from '../../Providers/Compares/CompareAveragesWithScenarioProvider';
import { MetricGroup } from '../../Models/Metrics/Base';

type DashboardResultsChartsViewProps = {
  service: Service;
  scenario: Scenario;
  percentilesAnalytics: PercentilesAnalytics[];
  responseTimesAnalytics: ResponseTimesAnalytics[];
  numberOfRequestsAnalytics: NumberOfRequestsAnalytics[];
  requestsPerSecondAnalytics: RequestsPerSecondAnalytics[];
};

const DashboardResultsView: FC<DashboardResultsChartsViewProps> = (props) => {
  const {
    service,
    scenario,
    percentilesAnalytics,
    responseTimesAnalytics,
    numberOfRequestsAnalytics,
    requestsPerSecondAnalytics
  } = props;
  const {
    loading,
    getPercentilesAnalytics,
    getResponseTimesAnalytics,
    getNumberOfRequestsAnalytics,
    getRequestsPerSecondAnalytics
  } = useResultsAnalytics();
  const [filters, setFilters] = useState<AnalyticsFilters>({
    startDatetime: getDefaultAnalyticsStartDatetime(),
    endDatetime: getDefaultAnalyticsEndDatetime()
  });

  useEffect(() => {
    const query: GetResultsAnalyticsQuery = { serviceId: service.id, scenarioId: scenario.id, ...filters };

    Promise.any([
      getPercentilesAnalytics(query),
      getResponseTimesAnalytics(query),
      getNumberOfRequestsAnalytics(query),
      getRequestsPerSecondAnalytics(query)
    ]);
  }, [filters, service.id, scenario.id]);

  return (
    <Fragment>
      <AnalyticsToolbarView title={'Total distribution'} filters={filters} setFilters={setFilters} />
      <AverageAnalyticsProvider>
        <AverageAnalyticsView filters={filters} />
        <CompareAveragesWithScenarioProvider>
          <CompareAveragesWithScenarioView filters={filters} />
        </CompareAveragesWithScenarioProvider>
      </AverageAnalyticsProvider>
      <RequestsPerSecondBarChartView
        type={ChartType.DashboardRequestsPerSecondBarChart}
        data={requestsPerSecondAnalytics}
        title={'Total requests per second'}
        loading={loading.getRequestsPerSecondAnalytics}
      />
      <NumberOfRequestsBarChartView
        type={ChartType.DashboardNumberOfRequestsBarChart}
        data={numberOfRequestsAnalytics}
        title={'Total requests'}
        loading={loading.getNumberOfRequestsAnalytics}
      />
      <ResponseTimesBarChartView
        type={ChartType.DashboardResponseTimesBarChart}
        data={responseTimesAnalytics}
        title={MetricGroup.ResponseTimes}
        loading={loading.getResponseTimesAnalytics}
      />
      <PercentilesBarChartView
        type={ChartType.DashboardPercentilesBarChart}
        data={percentilesAnalytics}
        title={MetricGroup.Percentiles}
        loading={loading.getPercentilesAnalytics}
      />
    </Fragment>
  );
};

const getState = (state: ReduxState) => ({
  service: state.services.service,
  scenario: state.scenarios.scenario,
  percentilesAnalytics: state.analytics.resultsPercentilesAnalytics,
  responseTimesAnalytics: state.analytics.resultsResponseTimesAnalytics,
  numberOfRequestsAnalytics: state.analytics.resultsNumberOfRequestsAnalytics,
  requestsPerSecondAnalytics: state.analytics.resultsRequestsPerSecondAnalytics
});
export default connect(getState)(DashboardResultsView);
