import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { FC, useEffect, useMemo, useState } from 'react';
import { ExceptionResultsTable } from '../../../Components/Tables/ExceptionResults/ExceptionResultsTable';
import { useExceptionResults } from '../../../Providers/Results/ExceptionResultsProvider';
import { ExceptionResult } from '../../../Models/Results/ExceptionResults';
import { ExceptionResultDetailsModal } from '../../../Components/Modals/Results/ExceptionResults/ExceptionResultDetailsModal';
import { WidgetView } from '../../../Components/Views/WidgetView';
import { TableSettingsMenu } from '../../../Components/Menus/Core/TableSettingsMenu';
import { TableType } from '../../../Models/Core/TableSettings';
import { SearchView } from '../../../Components/Views/SearchView';

type ExceptionResultsViewProps = {
  results: ExceptionResult[];
  loadTestResultId: number;
};

const ExceptionResultsView: FC<ExceptionResultsViewProps> = ({ results, loadTestResultId }) => {
  const { loading, getExceptionResults } = useExceptionResults();
  const [search, setSearch] = useState('');
  const [result, setResult] = useState<null | ExceptionResult>(null);
  const [exceptionResultDetailsModal, setExceptionResultDetailsModal] = useState(false);

  useEffect(() => {
    if (loadTestResultId) {
      getExceptionResults({ loadTestResultId });
    }
  }, [loadTestResultId]);

  const filteredResults = useMemo(
    () => results.filter((result) => result.message.toLowerCase().includes(search.toLowerCase())),
    [search, results]
  );

  const onViewDetails = (result: ExceptionResult) => {
    setResult(result);
    setExceptionResultDetailsModal(true);
  };

  return (
    <WidgetView
      sx={{ mt: 3 }}
      title={'Exceptions'}
      actions={[{ content: <TableSettingsMenu type={TableType.ExceptionResultsTable} /> }]}>
      <SearchView
        value={search}
        onChange={setSearch}
        placeholder={'Search by message'}
        totalResults={filteredResults.length}
      />
      <ExceptionResultsTable
        results={filteredResults}
        loading={loading.getExceptionResults}
        onViewDetails={onViewDetails}
      />
      {result && (
        <ExceptionResultDetailsModal
          modal={exceptionResultDetailsModal}
          setModal={setExceptionResultDetailsModal}
          exceptionResultId={result.id}
        />
      )}
    </WidgetView>
  );
};

const getState = (state: ReduxState) => ({
  results: state.exceptionResults.exceptionResults
});
export default connect(getState)(ExceptionResultsView);
