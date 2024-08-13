import { connect } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import Box from '@mui/material/Box';
import { EmptyView } from '../../Components/Views/EmptyView';
import { FC, useEffect, useState } from 'react';
import { useMethods } from '../../Providers/Results/MethodsProvider';
import { Service } from '../../Models/Services/Services';
import { Method } from '../../Models/Results/Methods';
import { ListView } from '../../Components/Views/ListView';
import { MethodView } from './MethodView';
import { MethodsToolbarView } from './MethodsToolbarView';
import { MethodsFilters } from '../../Components/Modals/Methods/MethodsFiltersModal';
import { getDefaultAnalyticsEndDatetime, getDefaultAnalyticsStartDatetime } from '../../Services/Analytics/Utils';
import { Scenario } from '../../Models/Services/Scenarios';

type MethodsListViewProps = {
  methods: Method[];
  service: Service;
  scenario: Scenario;
};

const MethodsListView: FC<MethodsListViewProps> = (props) => {
  const { service, methods, scenario } = props;
  const { loading, getMethods } = useMethods();
  const [filters, setFilters] = useState<MethodsFilters>({
    method: null,
    endDatetime: getDefaultAnalyticsEndDatetime(),
    startDatetime: getDefaultAnalyticsStartDatetime()
  });

  useEffect(() => {
    service.name && getMethods({ service: service.name, scenario: scenario.name, ...filters });
  }, [service.name, scenario.name, filters]);

  return (
    <Box>
      <MethodsToolbarView filters={filters} setFilters={setFilters} />
      {methods.length === 0 && !loading.getMethods && (
        <EmptyView
          containerSx={{ mt: 6 }}
          title={'There is no methods'}
          description={'Methods results will be aggregated after uploading load tests result'}
        />
      )}
      <ListView loading={loading.getMethods}>
        {methods.map((method, index) => (
          <MethodView key={index} method={method} />
        ))}
      </ListView>
    </Box>
  );
};

const getState = (state: ReduxState) => ({
  methods: state.methods.methods,
  service: state.services.service,
  scenario: state.scenarios.scenario
});
export default connect(getState)(MethodsListView);
