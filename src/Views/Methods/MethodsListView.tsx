import { connect } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import Box from '@mui/material/Box';
import { EmptyView } from '../../Components/Views/EmptyView';
import { FC, useEffect, useMemo, useState } from 'react';
import { useMethods } from '../../Providers/Methods/MethodsProvider';
import { Service } from '../../Models/Services/Services';
import { Method } from '../../Models/Methods/Methods';
import { ListView } from '../../Components/Views/ListView';
import { MethodView } from './MethodView';
import { MethodsToolbarView } from './MethodsToolbarView';
import { MethodsFilters } from '../../Components/Modals/Methods/MethodsFiltersModal';
import { Scenario } from '../../Models/Services/Scenarios';
import { SearchTextField } from '../../Components/TextFields/SearchTextField';
import { getDefaultMethodsFilters } from '../../Services/Methods/Utils';

type MethodsListViewProps = {
  methods: Method[];
  service: Service;
  scenario: Scenario;
};

const MethodsListView: FC<MethodsListViewProps> = (props) => {
  const { service, methods, scenario } = props;
  const { loading, getMethods } = useMethods();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<MethodsFilters>(getDefaultMethodsFilters());

  useEffect(() => {
    if (service.id) {
      getMethods({ serviceId: service.id, scenarioId: scenario.id, ...filters });
    }
  }, [service.id, scenario.id, filters]);

  const filteredMethods = useMemo(
    () => methods.filter((method) => method.method.toLowerCase().includes(search.toLowerCase())),
    [search, methods]
  );

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
      {methods.length > 0 && !loading.getMethods && (
        <SearchTextField value={search} onChange={setSearch} placeholder={'Search by method'} />
      )}
      <ListView loading={loading.getMethods}>
        {filteredMethods.map((method, index) => (
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
