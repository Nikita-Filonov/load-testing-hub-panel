import { connect } from 'react-redux';
import { FC } from 'react';
import { ReduxState } from '../../../Redux/ReduxState';
import { CompareResultsHistoryLineChartView } from '../../../Components/Charts/Compares/CompareHistoryResultsLineChartView';
import { NumberOfRequests } from '../../../Models/Metrics/NumberOfRequests';
import { CompareResultsHistoryNumberOfRequests } from '../../../Models/Compares/CompareResultsHistory';
import { CompareLoadTestResultsHistoryLoading } from '../../../Providers/Compares/CompareLoadTestResultsHistoryProvider';

type Props = {
  title: string;
  metric: keyof NumberOfRequests;
  loading: CompareLoadTestResultsHistoryLoading;
  compares: CompareResultsHistoryNumberOfRequests[];
};

const CompareLoadTestResultsHistoryNumberOfRequestsChartView: FC<Props> = (props) => {
  const { title, metric, loading, compares } = props;

  return (
    <CompareResultsHistoryLineChartView
      data={compares}
      title={title}
      metric={metric}
      loading={loading.getCompareLoadTestResultsHistoryNumberOfRequests}
    />
  );
};

const getState = (state: ReduxState) => ({
  compares: state.compareLoadTestResultsHistory.compareLoadTestResultsHistoryNumberOfRequests
});
export default connect(getState)(CompareLoadTestResultsHistoryNumberOfRequestsChartView);
