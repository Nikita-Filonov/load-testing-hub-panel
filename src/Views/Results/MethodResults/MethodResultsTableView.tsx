import { MethodResultsTable } from '../../../Components/Tables/MethodResults/MethodResultsTable';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { FC, useEffect } from 'react';
import { MethodResult } from '../../../Models/Results/MethodResults';
import { useMethodResults } from '../../../Providers/Results/MethodResultsProvider';

type MethodResultsTableViewProps = {
  results: MethodResult[];
  loadTestResultId: number;
};

const MethodResultsTableView: FC<MethodResultsTableViewProps> = ({ results, loadTestResultId }) => {
  const { loading, getMethodResults } = useMethodResults();

  useEffect(() => {
    loadTestResultId && getMethodResults({ loadTestResultId });
  }, [loadTestResultId]);

  return <MethodResultsTable results={results} loading={loading.getMethodResults} />;
};

const getState = (state: ReduxState) => ({
  results: state.methodResults.methodResults
});
export default connect(getState)(MethodResultsTableView);
