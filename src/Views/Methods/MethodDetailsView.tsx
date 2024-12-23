import { connect } from 'react-redux';
import { WidgetView } from '../../Components/Views/WidgetView';
import { WidgetInfoRowsView } from '../../Components/Views/WidgetInfoRowsView';
import { MethodDetails } from '../../Models/Results/Methods';
import { FC, useEffect } from 'react';
import { BaseInfoRowView } from '../../Components/Views/BaseInfoRowView';
import { ReduxState } from '../../Redux/ReduxState';
import { useMethods } from '../../Providers/Results/MethodsProvider';
import { BaseLabel } from '../../Components/Labels/BaseLabel';
import { AnalyticsFilters } from '../../Components/Modals/Analytics/AnalyticsFiltersModal';
import { Scenario } from '../../Models/Services/Scenarios';
import { Service } from '../../Models/Services/Services';
import { MetricName } from '../../Services/Constants/Metrics';
import { getMethodLabel } from '../../Services/Charts/Utils';

type MethodDetailsViewProps = {
  method: string;
  details: MethodDetails;
  filters: AnalyticsFilters;
  service: Service;
  scenario: Scenario;
};

const MethodDetailsView: FC<MethodDetailsViewProps> = (props) => {
  const { method, details, filters, service, scenario } = props;
  const { loading, getMethodDetails } = useMethods();

  useEffect(() => {
    method && getMethodDetails({ method, ...filters, serviceId: service.id, scenarioId: scenario.id });
  }, [method, filters, service.id, scenario.id]);

  return (
    <WidgetView
      sx={{ mt: 3 }}
      title={`Average values for ${getMethodLabel(details.method)} method`}
      loading={loading.getMethodDetails}
      label={<BaseLabel label={'GRPC'} color={'info'} />}>
      <WidgetInfoRowsView>
        <BaseInfoRowView name={'Method'} value={details.method} />
        <BaseInfoRowView name={MetricName.NumberOfRequests} value={details.averageNumberOfRequests} />
        <BaseInfoRowView name={MetricName.RequestsPerSecond} value={details.averageRequestsPerSecond} />
        <BaseInfoRowView name={MetricName.NumberOfFailures} value={details.averageNumberOfFailures} />
        <BaseInfoRowView name={MetricName.FailuresPerSecond} value={details.averageFailuresPerSecond} />
        <BaseInfoRowView name={MetricName.MaxResponseTime} value={details.averageMaxResponseTime} />
        <BaseInfoRowView name={MetricName.MinResponseTime} value={details.averageMinResponseTime} />
        <BaseInfoRowView name={MetricName.ResponseTime} value={details.averageResponseTime} />
        <BaseInfoRowView name={MetricName.ContentLength} value={details.averageContentLength} />
      </WidgetInfoRowsView>
    </WidgetView>
  );
};

const getState = (state: ReduxState) => ({
  details: state.methods.methodDetails,
  service: state.services.service,
  scenario: state.scenarios.scenario
});
export default connect(getState)(MethodDetailsView);
