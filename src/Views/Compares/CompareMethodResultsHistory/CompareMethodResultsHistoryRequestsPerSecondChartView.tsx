import { connect } from 'react-redux';
import { FC } from 'react';
import { ReduxState } from '../../../Redux/ReduxState';
import { CompareResultsHistoryLineChartView } from '../../../Components/Charts/Compares/CompareHistoryResultsLineChartView';
import { CompareResultsHistoryRequestsPerSecond } from '../../../Models/Compares/CompareResultsHistory';
import { CompareMethodResultsHistoryLoading } from '../../../Providers/Compares/CompareMethodResultsHistoryProvider';
import { RequestsPerSecond } from '../../../Models/Metrics/RequestsPerSecond';

type Props = {
  title: string;
  metric: keyof RequestsPerSecond;
  loading: CompareMethodResultsHistoryLoading;
  compares: CompareResultsHistoryRequestsPerSecond[];
};

const CompareMethodResultsHistoryRequestsPerSecondChartView: FC<Props> = (props) => {
  const { title, metric, loading, compares } = props;

  return (
    <CompareResultsHistoryLineChartView
      data={compares}
      title={title}
      metric={metric}
      loading={loading.getCompareMethodResultsHistoryRequestsPerSecond}
    />
  );
};

const getState = (state: ReduxState) => ({
  compares: state.compareMethodResultsHistory.compareMethodResultsHistoryRequestsPerSecond
});
export default connect(getState)(CompareMethodResultsHistoryRequestsPerSecondChartView);
