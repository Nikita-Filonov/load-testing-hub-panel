import { FC, Fragment, useEffect, useState } from 'react';
import MethodsAverageResponseTimeView from '../Methods/Charts/MethodsAverageResponseTimeView';
import { useMethods } from '../../Providers/Results/MethodsProvider';
import { connect } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import { Service } from '../../Models/Services/Services';
import MethodsAverageNumberOfRequestsView from '../Methods/Charts/MethodsAverageNumberOfRequestsView';
import MethodsAverageRequestsPerSecondView from '../Methods/Charts/MethodsAverageRequestsPerSecondView';
import { MethodsFilters } from '../../Components/Modals/Methods/MethodsFiltersModal';
import { getDefaultAnalyticsEndDatetime, getDefaultAnalyticsStartDatetime } from '../../Services/Analytics/Utils';
import { AnalyticsToolbarView } from '../Analytics/AnalyticsToolbarView';
import { Scenario } from '../../Models/Services/Scenarios';

type DashboardMethodsChartsViewProps = {
  service: Service;
  scenario: Scenario;
};

const DashboardMethodsChartsView: FC<DashboardMethodsChartsViewProps> = ({ service, scenario }) => {
  const { loading, getMethods } = useMethods();
  const [filters, setFilters] = useState<MethodsFilters>({
    endDatetime: getDefaultAnalyticsEndDatetime(),
    startDatetime: getDefaultAnalyticsStartDatetime()
  });

  useEffect(() => {
    getMethods({ service: service.name, scenario: scenario.name, ...filters });
  }, [service.name, filters]);

  return (
    <Fragment>
      <AnalyticsToolbarView
        title={'Distribution by method'}
        filters={filters}
        setFilters={setFilters}
        containerSx={{ mt: 3 }}
      />
      <MethodsAverageRequestsPerSecondView loading={loading.getMethods} />
      <MethodsAverageNumberOfRequestsView loading={loading.getMethods} />
      <MethodsAverageResponseTimeView loading={loading.getMethods} />
    </Fragment>
  );
};

const getState = (state: ReduxState) => ({
  service: state.services.service,
  scenario: state.scenarios.scenario
});
export default connect(getState)(DashboardMethodsChartsView);
