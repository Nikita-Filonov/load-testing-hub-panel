import { FC, Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import { ResponseTimesAnalytics } from '../../Models/Analytics/ResponseTimesAnalytics';
import { NumberOfRequestsAnalytics } from '../../Models/Analytics/NumberOfRequestsAnalytics';
import { RequestsPerSecondAnalytics } from '../../Models/Analytics/RequestsPerSecondAnalytics';
import { AnalyticsFilters } from '../../Components/Modals/Analytics/AnalyticsFiltersModal';
import { Scenario } from '../../Models/Services/Scenarios';
import { Service } from '../../Models/Services/Services';
import { PercentilesAnalytics } from '../../Models/Analytics/PercentilesAnalytics';
import { NumberOfRequestsBarChartView } from '../../Components/Charts/Metrics/NumberOfRequestsBarChartView';
import { ResponseTimesBarChartView } from '../../Components/Charts/Metrics/ResponseTimesBarChartView';
import { RequestsPerSecondBarChartView } from '../../Components/Charts/Metrics/RequestsPerSecondBarChartView';
import { ChartType } from '../../Models/Core/ChartSettings';
import { useMethods } from '../../Providers/Methods/MethodsProvider';
import { GetMethodDetailsAnalyticsQuery } from '../../Models/Methods/Analytics';
import { PercentilesBarChartView } from '../../Components/Charts/Metrics/PercentilesBarChartView';
import { getMethodLabel } from '../../Services/Methods/Utils';
import { MetricGroup } from '../../Models/Metrics/Base';

type MethodChartsViewProps = {
  method: string;
  filters: AnalyticsFilters;
  service: Service;
  scenario: Scenario;
  percentilesAnalytics: PercentilesAnalytics[];
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
    percentilesAnalytics,
    responseTimesAnalytics,
    numberOfRequestsAnalytics,
    requestsPerSecondAnalytics
  } = props;
  const {
    loading,
    getMethodDetailsPercentilesAnalytics,
    getMethodDetailsResponseTimesAnalytics,
    getMethodDetailsNumberOfRequestsAnalytics,
    getMethodDetailsRequestsPerSecondAnalytics
  } = useMethods();

  useEffect(() => {
    const query: GetMethodDetailsAnalyticsQuery = {
      method,
      ...filters,
      serviceId: service.id,
      scenarioId: scenario.id
    };

    Promise.any([
      getMethodDetailsPercentilesAnalytics(query),
      getMethodDetailsResponseTimesAnalytics(query),
      getMethodDetailsNumberOfRequestsAnalytics(query),
      getMethodDetailsRequestsPerSecondAnalytics(query)
    ]);
  }, [filters, method, service.id, scenario.id]);

  return (
    <Fragment>
      <PercentilesBarChartView
        type={ChartType.MethodPercentilesBarChart}
        data={percentilesAnalytics}
        title={`${MetricGroup.Percentiles} of ${getMethodLabel(method)}`}
        loading={loading.getMethodDetailsPercentilesAnalytics}
      />
      <RequestsPerSecondBarChartView
        type={ChartType.MethodRequestsPerSecondBarChart}
        data={requestsPerSecondAnalytics}
        title={`Total requests per second of ${getMethodLabel(method)}`}
        loading={loading.getMethodDetailsResponseTimesAnalytics}
      />
      <NumberOfRequestsBarChartView
        type={ChartType.MethodNumberOfRequestsBarChart}
        data={numberOfRequestsAnalytics}
        title={`Total requests of ${getMethodLabel(method)}`}
        loading={loading.getMethodDetailsNumberOfRequestsAnalytics}
      />
      <ResponseTimesBarChartView
        type={ChartType.MethodResponseTimesBarChart}
        data={responseTimesAnalytics}
        title={`MetricGroup.ResponseTimes of ${getMethodLabel(method)}`}
        loading={loading.getMethodDetailsRequestsPerSecondAnalytics}
      />
    </Fragment>
  );
};

const getState = (state: ReduxState) => ({
  service: state.services.service,
  scenario: state.scenarios.scenario,
  percentilesAnalytics: state.methods.methodDetailsPercentilesAnalytics,
  responseTimesAnalytics: state.methods.methodDetailsResponseTimesAnalytics,
  numberOfRequestsAnalytics: state.methods.methodDetailsNumberOfRequestsAnalytics,
  requestsPerSecondAnalytics: state.methods.methodDetailsRequestsPerSecondAnalytics
});
export default connect(getState)(MethodChartsView);
