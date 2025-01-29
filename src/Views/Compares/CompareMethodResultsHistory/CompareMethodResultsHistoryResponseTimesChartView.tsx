import { connect } from 'react-redux';
import { FC } from 'react';
import { ReduxState } from '../../../Redux/ReduxState';
import { CompareResultsHistoryLineChartView } from '../../../Components/Charts/Compares/CompareHistoryResultsLineChartView';
import { CompareResultsHistoryResponseTimes } from '../../../Models/Compares/CompareResultsHistory';
import { CompareMethodResultsHistoryLoading } from '../../../Providers/Compares/CompareMethodResultsHistoryProvider';
import { ResponseTimes } from '../../../Models/Metrics/ResponseTimes';
import { msValueFormatter } from '../../../Services/Charts/Utils';

type Props = {
  title: string;
  metric: keyof ResponseTimes;
  loading: CompareMethodResultsHistoryLoading;
  compares: CompareResultsHistoryResponseTimes[];
};

const CompareMethodResultsHistoryResponseTimesChartView: FC<Props> = (props) => {
  const { title, metric, loading, compares } = props;

  return (
    <CompareResultsHistoryLineChartView
      data={compares}
      title={title}
      metric={metric}
      loading={loading.getCompareMethodResultsHistoryResponseTimes}
      valueFormatter={msValueFormatter}
    />
  );
};

const getState = (state: ReduxState) => ({
  compares: state.compareMethodResultsHistory.compareMethodResultsHistoryResponseTimes
});
export default connect(getState)(CompareMethodResultsHistoryResponseTimesChartView);
