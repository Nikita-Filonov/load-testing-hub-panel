import { FC, Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { PercentilesLineChartView } from '../../../Components/Charts/Metrics/PercentilesLineChartView';
import { NumberOfRequestsLineChartView } from '../../../Components/Charts/Metrics/NumberOfRequestsLineChartView';
import { NumberOfUsersLineChartView } from '../../../Components/Charts/Metrics/NumberOfUsersLineChartView';
import { ResponseTimesLineChartView } from '../../../Components/Charts/Metrics/ResponseTimesLineChartView';
import { RequestsPerSecondLineChartView } from '../../../Components/Charts/Metrics/RequestsPerSecondLineChartView';
import { ChartType } from '../../../Models/Core/ChartSettings';
import { ResultsHistory } from '../../../Models/Results/ResultsHistory';
import { useLoadTestResultsHistory } from '../../../Providers/Results/LoadTestResultsHistoryProvider';

type Props = {
  history: ResultsHistory[];
  loadTestResultId: number;
};

const LoadTestResultsHistoryChartsView: FC<Props> = ({ history, loadTestResultId }) => {
  const { loading, getLoadTestResultsHistory } = useLoadTestResultsHistory();

  useEffect(() => {
    if (loadTestResultId) {
      getLoadTestResultsHistory({ loadTestResultId });
    }
  }, [loadTestResultId]);

  return (
    <Fragment>
      <RequestsPerSecondLineChartView
        type={ChartType.LoadTestResultsHistoryRequestsPerSecondLineChart}
        data={history}
        loading={loading.getLoadTestResultsHistory}
      />
      <NumberOfRequestsLineChartView
        type={ChartType.LoadTestResultsHistoryNumberOfRequestsLineChart}
        data={history}
        loading={loading.getLoadTestResultsHistory}
      />
      <ResponseTimesLineChartView
        type={ChartType.LoadTestResultsHistoryResponseTimesLineChart}
        data={history}
        loading={loading.getLoadTestResultsHistory}
      />
      <PercentilesLineChartView
        type={ChartType.LoadTestResultsHistoryPercentilesLineChart}
        data={history}
        title={'Percentiles (ms)'}
        loading={loading.getLoadTestResultsHistory}
      />
      <NumberOfUsersLineChartView
        type={ChartType.LoadTestResultsHistoryNumberOfUsersLineChart}
        data={history}
        loading={loading.getLoadTestResultsHistory}
      />
    </Fragment>
  );
};

const getState = (state: ReduxState) => ({
  history: state.loadTestResultsHistory.loadTestResultsHistory
});
export default connect(getState)(LoadTestResultsHistoryChartsView);
