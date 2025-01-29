import { connect } from 'react-redux';
import { FC } from 'react';
import { ReduxState } from '../../../Redux/ReduxState';
import { CompareResultsHistoryLineChartView } from '../../../Components/Charts/Compares/CompareHistoryResultsLineChartView';
import { NumberOfRequests } from '../../../Models/Metrics/NumberOfRequests';
import { CompareResultsHistoryNumberOfRequests } from '../../../Models/Compares/CompareResultsHistory';
import { CompareMethodResultsHistoryLoading } from '../../../Providers/Compares/CompareMethodResultsHistoryProvider';

type Props = {
  title: string;
  metric: keyof NumberOfRequests;
  loading: CompareMethodResultsHistoryLoading;
  compares: CompareResultsHistoryNumberOfRequests[];
};

const CompareMethodResultsHistoryNumberOfRequestsChartView: FC<Props> = (props) => {
  const { title, metric, loading, compares } = props;

  return (
    <CompareResultsHistoryLineChartView
      data={compares}
      title={title}
      metric={metric}
      loading={loading.getCompareMethodResultsHistoryNumberOfRequests}
    />
  );
};

const getState = (state: ReduxState) => ({
  compares: state.compareMethodResultsHistory.compareMethodResultsHistoryNumberOfRequests
});
export default connect(getState)(CompareMethodResultsHistoryNumberOfRequestsChartView);
