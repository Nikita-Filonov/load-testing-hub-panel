import { FC, Fragment, useEffect, useState } from 'react';
import { AnalyticsToolbarView } from '../Analytics/AnalyticsToolbarView';
import { RequestsPerSecondAnalyticsView } from '../Analytics/RequestsPerSecondAnalyticsView';
import { ResponseTimesAnalyticsView } from '../Analytics/ResponseTimesAnalyticsView';
import { NumberOfRequestsAnalyticsView } from '../Analytics/NumberOfRequestsAnalyticsView';
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
import AverageAnalyticsCompareChartView from '../Analytics/AverageAnalyticsCompareChartView';

type DashboardResultsChartsViewProps = {
  service: Service;
  scenario: Scenario;
  responseTimesAnalytics: ResponseTimesAnalytics[];
  numberOfRequestsAnalytics: NumberOfRequestsAnalytics[];
  requestsPerSecondAnalytics: RequestsPerSecondAnalytics[];
};

const DashboardResultsChartsView: FC<DashboardResultsChartsViewProps> = (props) => {
  const { service, scenario, responseTimesAnalytics, numberOfRequestsAnalytics, requestsPerSecondAnalytics } = props;
  const { loading, getResponseTimesAnalytics, getNumberOfRequestsAnalytics, getRequestsPerSecondAnalytics } =
    useResultsAnalytics();
  const [filters, setFilters] = useState<AnalyticsFilters>({
    startDatetime: getDefaultAnalyticsStartDatetime(),
    endDatetime: getDefaultAnalyticsEndDatetime()
  });

  useEffect(() => {
    const query: GetResultsAnalyticsQuery = { service: service.name, scenario: scenario.name, ...filters };

    Promise.all([
      getResponseTimesAnalytics(query),
      getNumberOfRequestsAnalytics(query),
      getRequestsPerSecondAnalytics(query)
    ]);
  }, [filters, service.name, scenario.name]);

  return (
    <Fragment>
      <AnalyticsToolbarView title={'Total distribution'} filters={filters} setFilters={setFilters} />
      <AverageAnalyticsProvider>
        <AverageAnalyticsView filters={filters} />
        <AverageAnalyticsCompareChartView filters={filters} />
      </AverageAnalyticsProvider>
      <RequestsPerSecondAnalyticsView
        title={'Total requests per second'}
        loading={loading.getRequestsPerSecondAnalytics}
        analytics={requestsPerSecondAnalytics}
      />
      <NumberOfRequestsAnalyticsView
        title={'Total requests'}
        loading={loading.getNumberOfRequestsAnalytics}
        analytics={numberOfRequestsAnalytics}
      />
      <ResponseTimesAnalyticsView
        title={'Response times (ms)'}
        loading={loading.getResponseTimesAnalytics}
        analytics={responseTimesAnalytics}
      />
    </Fragment>
  );
};

const getState = (state: ReduxState) => ({
  service: state.services.service,
  scenario: state.scenarios.scenario,
  responseTimesAnalytics: state.analytics.resultsResponseTimesAnalytics,
  numberOfRequestsAnalytics: state.analytics.resultsNumberOfRequestsAnalytics,
  requestsPerSecondAnalytics: state.analytics.resultsRequestsPerSecondAnalytics
});
export default connect(getState)(DashboardResultsChartsView);
