import { FC, Fragment, useEffect } from 'react';
import TotalRequestsPerSecondCompareChartView from './TotalRequestsPerSecondCompareChartView';
import ResponseTimesCompareChartView from './ResponseTimesCompareChartView';
import NumberOfUsersCompareChartView from './NumberOfUsersCompareChartView';
import { useCompares } from '../../../Providers/Compares/ComparesProvider';
import { connect, useDispatch } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { CompareHistoryResults } from '../../../Models/Compares/CompareHistoryResults';
import { setCompareHistoryResults } from '../../../Redux/Compares/Compares/ComparesSlice';
import { INITIAL_COMPARES } from '../../../Redux/Compares/Compares/InitialState';

type CompareHistoryResultsViewProps = {
  compares: CompareHistoryResults[];
  loadTestResultId: number;
  compareWithLoadTestResults: number[];
};

const CompareHistoryResultsView: FC<CompareHistoryResultsViewProps> = (props) => {
  const { compares, loadTestResultId, compareWithLoadTestResults } = props;
  const dispatch = useDispatch();
  const { loading, getCompareHistoryResults } = useCompares();

  useEffect(() => {
    compareWithLoadTestResults.length > 0
      ? getCompareHistoryResults({ loadTestResultId, compareWithLoadTestResults })
      : dispatch(setCompareHistoryResults(INITIAL_COMPARES.compareHistoryResults));
  }, [loadTestResultId, compareWithLoadTestResults]);

  if (compares.length === 0) return null;

  return (
    <Fragment>
      <TotalRequestsPerSecondCompareChartView loading={loading.getCompareHistoryResults} />
      <ResponseTimesCompareChartView loading={loading.getCompareHistoryResults} />
      <NumberOfUsersCompareChartView loading={loading.getCompareHistoryResults} />
    </Fragment>
  );
};

const getState = (state: ReduxState) => ({ compares: state.compares.compareHistoryResults });
export default connect(getState)(CompareHistoryResultsView);
