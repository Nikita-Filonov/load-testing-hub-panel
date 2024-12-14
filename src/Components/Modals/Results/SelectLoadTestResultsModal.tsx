import { BaseModal } from '../BaseModal';
import { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BasePagination } from '../../Pagination/BasePagination';
import { ListView } from '../../Views/ListView';
import { ReduxState } from '../../../Redux/ReduxState';
import { LoadTestResult } from '../../../Models/Results/LoadTestResults';
import { useLoadTestResults } from '../../../Providers/Results/LoadTestResultsProvider';
import { Service } from '../../../Models/Services/Services';
import { Scenario } from '../../../Models/Services/Scenarios';
import { LoadTestResultListItem } from '../../ListItems/Results/LoadTestResultListItem';
import { EmptyView } from '../../Views/EmptyView';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { countNotNullValues } from '../../../Services/Core/Utils';
import { LoadTestResultsFilters, LoadTestResultsFiltersModal } from './LoadTestResultsFiltersModal';
import { getDefaultLoadTestResultsFilters } from '../../../Services/Results/Utils';

type SelectLoadTestResultsModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  service: Service;
  scenario: Scenario;
  loadTestResults: LoadTestResult[];
  loadTestResultsTotal: number;
  selectedLoadTestResults: number[];
  onSelectLoadTestResults: (results: number[]) => void;
};

const limit = 20;

const SelectLoadTestResultsModal: FC<SelectLoadTestResultsModalProps> = (props) => {
  const {
    modal,
    setModal,
    service,
    scenario,
    loadTestResults,
    loadTestResultsTotal,
    selectedLoadTestResults,
    onSelectLoadTestResults
  } = props;
  const { loading, getLoadTestResults } = useLoadTestResults();
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState<LoadTestResultsFilters>(getDefaultLoadTestResultsFilters());
  const [loadTestResultsFiltersModal, setLoadTestResultsFiltersModal] = useState(false);

  useEffect(() => {
    modal && getLoadTestResults({ limit, offset, serviceId: service.id, scenarioId: scenario.id, ...filters });
  }, [modal, offset, service.id, scenario.id, filters]);

  const onSelectResult = (loadTestResultId: number) => {
    onSelectLoadTestResults(
      selectedLoadTestResults.includes(loadTestResultId)
        ? selectedLoadTestResults.filter((result) => result !== loadTestResultId)
        : [...selectedLoadTestResults, loadTestResultId]
    );
  };

  const onLoadTestResultsFilters = () => setLoadTestResultsFiltersModal(true);

  return (
    <BaseModal
      modal={modal}
      setModal={setModal}
      title={'Select load test results'}
      maxWidth={'md'}
      actions={[
        {
          icon: <FilterAltOutlinedIcon />,
          onClick: onLoadTestResultsFilters,
          badgeContent: countNotNullValues(filters)
        }
      ]}>
      {loadTestResults.length === 0 && !loading.getLoadTestResults && (
        <EmptyView
          containerSx={{ mt: 6 }}
          title={'There is no results'}
          description={'Results from the load test pipeline will be displayed here'}
        />
      )}
      <ListView loading={loading.getLoadTestResults} containerSx={{ mt: 0 }}>
        {loadTestResults.map((result) => (
          <LoadTestResultListItem
            key={result.id}
            result={result}
            selected={selectedLoadTestResults.includes(result.id)}
            onSelectResult={onSelectResult}
          />
        ))}
        {loadTestResults.length > 0 && (
          <BasePagination
            page={page}
            total={loadTestResultsTotal}
            limit={limit}
            setPage={setPage}
            setOffset={setOffset}
            containerSx={{ mt: 3 }}
          />
        )}
      </ListView>
      <LoadTestResultsFiltersModal
        modal={loadTestResultsFiltersModal}
        setModal={setLoadTestResultsFiltersModal}
        filters={filters}
        setFilters={setFilters}
      />
    </BaseModal>
  );
};

const getState = (state: ReduxState) => ({
  service: state.services.service,
  scenario: state.scenarios.scenario,
  loadTestResults: state.loadTestResults.loadTestResults,
  loadTestResultsTotal: state.loadTestResults.loadTestResultsTotal
});
export default connect(getState)(SelectLoadTestResultsModal);
