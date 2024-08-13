import { useLoadTestResults } from '../../../Providers/Results/LoadTestResultsProvider';
import { FC, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { BasePagination } from '../../../Components/Pagination/BasePagination';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { LoadTestResultView } from './LoadTestResultView';
import { LoadTestResult } from '../../../Models/Results/LoadTestResults';
import { Service } from '../../../Models/Services/Services';
import { EmptyView } from '../../../Components/Views/EmptyView';
import { ListView } from '../../../Components/Views/ListView';
import { LoadTestResultsToolbarView } from './LoadTestResultsToolbarView';
import { LoadTestResultsFilters } from '../../../Components/Modals/Results/LoadTestResultsFiltersModal';
import { Scenario } from '../../../Models/Services/Scenarios';

type LoadTestResultsListViewProps = {
  service: Service;
  scenario: Scenario;
  loadTestResults: LoadTestResult[];
  loadTestResultsTotal: number;
};

const limit = 20;

const LoadTestResultsListView: FC<LoadTestResultsListViewProps> = (props) => {
  const { service, scenario, loadTestResults, loadTestResultsTotal } = props;
  const { loading, getLoadTestResults } = useLoadTestResults();
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState<LoadTestResultsFilters>({
    startedAt: null,
    finishedAt: null,
    triggerCIProjectVersion: null
  });

  useEffect(() => {
    getLoadTestResults({ service: service.name, scenario: scenario.name, limit, offset, ...filters });
  }, [offset, service.name, scenario.name, filters]);

  return (
    <Box>
      <LoadTestResultsToolbarView filters={filters} setFilters={setFilters} />
      {loadTestResults.length === 0 && !loading.getLoadTestResults && (
        <EmptyView
          containerSx={{ mt: 6 }}
          title={'There is no results'}
          description={'Results from the load test pipeline will be displayed here'}
        />
      )}
      <ListView loading={loading.getLoadTestResults}>
        {loadTestResults.map((result) => (
          <LoadTestResultView key={result.id} result={result} />
        ))}
        <BasePagination
          page={page}
          total={loadTestResultsTotal}
          limit={limit}
          setPage={setPage}
          setOffset={setOffset}
        />
      </ListView>
    </Box>
  );
};

const getState = (state: ReduxState) => ({
  service: state.services.service,
  scenario: state.scenarios.scenario,
  loadTestResults: state.loadTestResults.loadTestResults,
  loadTestResultsTotal: state.loadTestResults.loadTestResultsTotal
});
export default connect(getState)(LoadTestResultsListView);
