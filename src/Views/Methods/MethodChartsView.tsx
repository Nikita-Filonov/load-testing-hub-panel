import { FC, Fragment, useEffect } from 'react';
import { RequestsPerSecondAnalyticsView } from '../Analytics/RequestsPerSecondAnalyticsView';
import { ResponseTimesAnalyticsView } from '../Analytics/ResponseTimesAnalyticsView';
import { NumberOfRequestsAnalyticsView } from '../Analytics/NumberOfRequestsAnalyticsView';
import { connect } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import { ResponseTimesAnalytics } from '../../Models/Analytics/ResponseTimesAnalytics';
import { NumberOfRequestsAnalytics } from '../../Models/Analytics/NumberOfRequestsAnalytics';
import { RequestsPerSecondAnalytics } from '../../Models/Analytics/RequestsPerSecondAnalytics';
import { useMethodsAnalytics } from '../../Providers/Analytics/MethodsAnalyticsProvider';
import { GetMethodsAnalyticsQuery } from '../../Models/Analytics/MethodsAnalytics';
import { AnalyticsFilters } from '../../Components/Modals/Analytics/AnalyticsFiltersModal';
import { Scenario } from '../../Models/Services/Scenarios';
import { Service } from '../../Models/Services/Services';

type MethodChartsViewProps = {
  method: string;
  filters: AnalyticsFilters;
  service: Service;
  scenario: Scenario;
  responseTimesAnalytics: ResponseTimesAnalytics[];
  numberOfRequestsAnalytics: NumberOfRequestsAnalytics[];
  requestsPerSecondAnalytics: RequestsPerSecondAnalytics[];
};

const MethodChartsView: FC<MethodChartsViewProps> = (props) => {
  const {
    method,
    filters,
    service,
    scenario,
    responseTimesAnalytics,
    numberOfRequestsAnalytics,
    requestsPerSecondAnalytics
  } = props;
  const { loading, getResponseTimesAnalytics, getNumberOfRequestsAnalytics, getRequestsPerSecondAnalytics } =
    useMethodsAnalytics();

  useEffect(() => {
    const query: GetMethodsAnalyticsQuery = { method, ...filters, serviceId: service.id, scenarioId: scenario.id };

    Promise.any([
      getResponseTimesAnalytics(query),
      getNumberOfRequestsAnalytics(query),
      getRequestsPerSecondAnalytics(query)
    ]);
  }, [filters, method, service.id, scenario.id]);

  return (
    <Fragment>
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
  responseTimesAnalytics: state.analytics.methodsResponseTimesAnalytics,
  numberOfRequestsAnalytics: state.analytics.methodsNumberOfRequestsAnalytics,
  requestsPerSecondAnalytics: state.analytics.methodsRequestsPerSecondAnalytics
});
export default connect(getState)(MethodChartsView);
