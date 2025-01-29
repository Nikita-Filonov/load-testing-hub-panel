import { connect } from 'react-redux';
import { FC } from 'react';
import { ReduxState } from '../../../Redux/ReduxState';
import { ResponseTimes } from '../../../Models/Metrics/ResponseTimes';
import { CompareLoadTestResultsHistoryLoading } from '../../../Providers/Compares/CompareLoadTestResultsHistoryProvider';
import { CompareResultsHistoryResponseTimes } from '../../../Models/Compares/CompareResultsHistory';
import { CompareResultsHistoryLineChartView } from '../../../Components/Charts/Compares/CompareHistoryResultsLineChartView';
import { msValueFormatter } from '../../../Services/Charts/Utils';

type Props = {
  title: string;
  metric: keyof ResponseTimes;
  loading: CompareLoadTestResultsHistoryLoading;
  compares: CompareResultsHistoryResponseTimes[];
};

const CompareLoadTestResultsHistoryResponseTimesChartView: FC<Props> = (props) => {
  const { title, metric, loading, compares } = props;

  return (
    <CompareResultsHistoryLineChartView
      data={compares}
      title={title}
      metric={metric}
      loading={loading.getCompareLoadTestResultsHistoryResponseTimes}
      valueFormatter={msValueFormatter}
    />
  );
};

const getState = (state: ReduxState) => ({
  compares: state.compareLoadTestResultsHistory.compareLoadTestResultsHistoryResponseTimes
});
export default connect(getState)(CompareLoadTestResultsHistoryResponseTimesChartView);
