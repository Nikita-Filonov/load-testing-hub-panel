import { connect } from 'react-redux';
import { FC } from 'react';
import { ReduxState } from '../../../Redux/ReduxState';
import { CompareResultsHistoryLineChartView } from '../../../Components/Charts/Compares/CompareHistoryResultsLineChartView';
import { RequestsPerSecond } from '../../../Models/Metrics/RequestsPerSecond';
import { CompareResultsHistoryRequestsPerSecond } from '../../../Models/Compares/CompareResultsHistory';
import { CompareLoadTestResultsHistoryLoading } from '../../../Providers/Compares/CompareLoadTestResultsHistoryProvider';

type Props = {
  title: string;
  metric: keyof RequestsPerSecond;
  loading: CompareLoadTestResultsHistoryLoading;
  compares: CompareResultsHistoryRequestsPerSecond[];
};

const CompareLoadTestResultsHistoryRequestsPerSecondChartView: FC<Props> = (props) => {
  const { title, metric, loading, compares } = props;

  return (
    <CompareResultsHistoryLineChartView
      data={compares}
      title={title}
      metric={metric}
      loading={loading.getCompareLoadTestResultsHistoryRequestsPerSecond}
    />
  );
};

const getState = (state: ReduxState) => ({
  compares: state.compareLoadTestResultsHistory.compareLoadTestResultsHistoryRequestsPerSecond
});
export default connect(getState)(CompareLoadTestResultsHistoryRequestsPerSecondChartView);
