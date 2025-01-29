import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { FC, useEffect } from 'react';
import { useMethodResults } from '../../../Providers/Results/MethodResultsProvider';
import MethodResultsPercentilesView from './MethodResultsPercentilesView';
import MethodResultsStatisticsView from './MethodResultsStatisticsView';
import Box from '@mui/material/Box';

type MethodResultsViewProps = {
  loadTestResultId: number;
};

const MethodResultsView: FC<MethodResultsViewProps> = ({ loadTestResultId }) => {
  const { loading, getMethodResults } = useMethodResults();

  useEffect(() => {
    if (loadTestResultId) {
      getMethodResults({ loadTestResultId });
    }
  }, [loadTestResultId]);

  return (
    <Box>
      <MethodResultsStatisticsView loading={loading.getMethodResults} />
      <MethodResultsPercentilesView loading={loading.getMethodResults} />
    </Box>
  );
};

const getState = (state: ReduxState) => ({
  results: state.methodResults.methodResults
});
export default connect(getState)(MethodResultsView);
