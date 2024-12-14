import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { FC, Fragment, useEffect, useState } from 'react';
import { ExceptionResultsTable } from '../../../Components/Tables/ExceptionResults/ExceptionResultsTable';
import { useExceptionResults } from '../../../Providers/Results/ExceptionResultsProvider';
import { ExceptionResult } from '../../../Models/Results/ExceptionResults';
import { ExceptionResultDetailsModal } from '../../../Components/Modals/Results/ExceptionResultDetailsModal';

type ExceptionResultsTableViewProps = {
  results: ExceptionResult[];
  loadTestResultId: number;
};

const ExceptionResultsTableView: FC<ExceptionResultsTableViewProps> = ({ results, loadTestResultId }) => {
  const { loading, getExceptionResults } = useExceptionResults();
  const [result, setResult] = useState<null | ExceptionResult>(null);
  const [exceptionResultDetailsModal, setExceptionResultDetailsModal] = useState(false);

  useEffect(() => {
    loadTestResultId && getExceptionResults({ loadTestResultId });
  }, [loadTestResultId]);

  const onViewDetails = (result: ExceptionResult) => {
    setResult(result);
    setExceptionResultDetailsModal(true);
  };

  return (
    <Fragment>
      <ExceptionResultsTable results={results} loading={loading.getExceptionResults} onViewDetails={onViewDetails} />
      {result && (
        <ExceptionResultDetailsModal
          modal={exceptionResultDetailsModal}
          setModal={setExceptionResultDetailsModal}
          exceptionResultId={result.id}
        />
      )}
    </Fragment>
  );
};

const getState = (state: ReduxState) => ({
  results: state.exceptionResults.exceptionResults
});
export default connect(getState)(ExceptionResultsTableView);
