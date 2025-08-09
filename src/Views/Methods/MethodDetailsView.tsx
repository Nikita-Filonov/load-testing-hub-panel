import { connect } from 'react-redux';
import { WidgetView } from '../../Components/Views/WidgetView';
import { MethodDetails } from '../../Models/Methods/Methods';
import { FC, useEffect } from 'react';
import { ReduxState } from '../../Redux/ReduxState';
import { useMethods } from '../../Providers/Methods/MethodsProvider';
import { AnalyticsFilters } from '../../Components/Modals/Analytics/AnalyticsFiltersModal';
import { Scenario } from '../../Models/Services/Scenarios';
import { Service } from '../../Models/Services/Services';
import { BaseMethodResultDetailsView } from '../Results/MethodResults/BaseMethodResultDetailsView';
import { MethodResultProtocolLabel } from '../../Components/Labels/Results/MethodResults/MethodResultProtocolLabel';
import { getMethodLabel } from '../../Services/Methods/Utils';

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
    if (method) {
      getMethodDetails({ method, ...filters, serviceId: service.id, scenarioId: scenario.id });
    }
  }, [method, filters, service.id, scenario.id]);

  return (
    <WidgetView
      sx={{ mt: 3 }}
      title={`Average values for ${getMethodLabel(details.method)} method`}
      label={<MethodResultProtocolLabel protocol={details.protocol} />}
      loading={loading.getMethodDetails}>
      <BaseMethodResultDetailsView details={details} />
    </WidgetView>
  );
};

const getState = (state: ReduxState) => ({
  details: state.methods.methodDetails,
  service: state.services.service,
  scenario: state.scenarios.scenario
});
export default connect(getState)(MethodDetailsView);
