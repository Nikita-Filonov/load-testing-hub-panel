import { connect } from 'react-redux';
import { FC } from 'react';
import { ReduxState } from '../../../Redux/ReduxState';
import { CompareResultsHistoryLineChartView } from '../../../Components/Charts/Compares/CompareHistoryResultsLineChartView';
import { CompareResultsHistoryNumberOfUsers } from '../../../Models/Compares/CompareResultsHistory';
import { CompareMethodResultsHistoryLoading } from '../../../Providers/Compares/CompareMethodResultsHistoryProvider';
import { NumberOfUsers } from '../../../Models/Metrics/NumberOfUsers';

type Props = {
  title: string;
  metric: keyof NumberOfUsers;
  loading: CompareMethodResultsHistoryLoading;
  compares: CompareResultsHistoryNumberOfUsers[];
};

const CompareMethodResultsHistoryNumberOfUsersChartView: FC<Props> = (props) => {
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
  compares: state.compareMethodResultsHistory.compareMethodResultsHistoryNumberOfUsers
});
export default connect(getState)(CompareMethodResultsHistoryNumberOfUsersChartView);
