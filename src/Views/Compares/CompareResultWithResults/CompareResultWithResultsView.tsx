import { CompareResultWithResults } from '../../../Models/Compares/CompareResultWithResults';
import { FC, useEffect } from 'react';
import { useCompares } from '../../../Providers/Compares/ComparesProvider';
import Box from '@mui/material/Box';
import { connect, useDispatch } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { EmptyView } from '../../../Components/Views/EmptyView';
import { CompareResultWithResultsSingleView } from './CompareResultWithResultsSingleView';
import { setCompareResultWithResults } from '../../../Redux/Compares/Compares/ComparesSlice';
import { INITIAL_COMPARES } from '../../../Redux/Compares/Compares/InitialState';
import { BoxView } from '../../../Components/Views/BoxView';
import CompareResultWithResultsAverageSummaryView from './CompareResultWithResultsAverageSummaryView';

type CompareResultWithResultsViewProps = {
  compares: CompareResultWithResults[];
  loadTestResultId: number;
  compareWithLoadTestResults: number[];
};

const CompareResultWithResultsView: FC<CompareResultWithResultsViewProps> = (props) => {
  const { compares, loadTestResultId, compareWithLoadTestResults } = props;
  const dispatch = useDispatch();
  const { loading, getCompareResultWithResults } = useCompares();

  useEffect(() => {
    compareWithLoadTestResults.length > 0
      ? getCompareResultWithResults({ loadTestResultId, compareWithLoadTestResults })
      : dispatch(setCompareResultWithResults(INITIAL_COMPARES.compareResultWithResults));
  }, [loadTestResultId, compareWithLoadTestResults]);

  return (
    <Box>
      {compares.length === 0 && !loading.getCompareResultWithResults && (
        <EmptyView
          containerSx={{ mt: 6, mb: 10 }}
          title={'There are no results to compare here'}
          description={'Select the results to compare, and they will be displayed here'}
        />
      )}
      <BoxView loading={loading.getCompareResultWithResults} containerSx={{ mt: 0 }}>
        {compares.length > 0 && (
          <CompareResultWithResultsAverageSummaryView compareWithLoadTestResults={compareWithLoadTestResults} />
        )}
        {compares.map((compare, index) => (
          <CompareResultWithResultsSingleView key={index} compare={compare} />
        ))}
      </BoxView>
    </Box>
  );
};

const getState = (state: ReduxState) => ({ compares: state.compares.compareResultWithResults });
export default connect(getState)(CompareResultWithResultsView);
