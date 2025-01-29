import { connect } from 'react-redux';
import { FC } from 'react';
import { ReduxState } from '../../../Redux/ReduxState';
import { NumberOfUsers } from '../../../Models/Metrics/NumberOfUsers';
import { CompareResultsHistoryLineChartView } from '../../../Components/Charts/Compares/CompareHistoryResultsLineChartView';
import { CompareLoadTestResultsHistoryLoading } from '../../../Providers/Compares/CompareLoadTestResultsHistoryProvider';
import { CompareResultsHistoryNumberOfUsers } from '../../../Models/Compares/CompareResultsHistory';

type Props = {
  title: string;
  metric: keyof NumberOfUsers;
  loading: CompareLoadTestResultsHistoryLoading;
  compares: CompareResultsHistoryNumberOfUsers[];
};

const CompareLoadTestResultsHistoryNumberOfUsersChartView: FC<Props> = (props) => {
  const { title, metric, loading, compares } = props;

  return (
    <CompareResultsHistoryLineChartView
      data={compares}
      title={title}
      metric={metric}
      loading={loading.getCompareLoadTestResultsHistoryNumberOfUsers}
    />
  );
};

const getState = (state: ReduxState) => ({
  compares: state.compareLoadTestResultsHistory.compareLoadTestResultsHistoryNumberOfUsers
});
export default connect(getState)(CompareLoadTestResultsHistoryNumberOfUsersChartView);
