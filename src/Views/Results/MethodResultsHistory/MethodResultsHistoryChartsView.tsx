import { FC, Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { PercentilesLineChartView } from '../../../Components/Charts/Metrics/PercentilesLineChartView';
import { NumberOfRequestsLineChartView } from '../../../Components/Charts/Metrics/NumberOfRequestsLineChartView';
import { NumberOfUsersLineChartView } from '../../../Components/Charts/Metrics/NumberOfUsersLineChartView';
import { ResponseTimesLineChartView } from '../../../Components/Charts/Metrics/ResponseTimesLineChartView';
import { RequestsPerSecondLineChartView } from '../../../Components/Charts/Metrics/RequestsPerSecondLineChartView';
import { ChartType } from '../../../Models/Core/ChartSettings';
import { useMethodResultsHistory } from '../../../Providers/Results/MethodResultsHistoryProvider';
import { ResultsHistory } from '../../../Models/Results/ResultsHistory';

type Props = {
  history: ResultsHistory[];
  methodResultId: number;
};

const MethodResultsHistoryChartsView: FC<Props> = ({ history, methodResultId }) => {
  const { loading, getMethodResultsHistory } = useMethodResultsHistory();

  useEffect(() => {
    if (methodResultId) {
      getMethodResultsHistory({ methodResultId });
    }
  }, [methodResultId]);

  return (
    <Fragment>
      <RequestsPerSecondLineChartView
        type={ChartType.MethodResultsHistoryRequestsPerSecondLineChart}
        data={history}
        loading={loading.getMethodResultsHistory}
      />
      <NumberOfRequestsLineChartView
        type={ChartType.MethodResultsHistoryNumberOfRequestsLineChart}
        data={history}
        loading={loading.getMethodResultsHistory}
      />
      <ResponseTimesLineChartView
        type={ChartType.MethodResultsHistoryResponseTimesLineChart}
        data={history}
        loading={loading.getMethodResultsHistory}
      />
      <PercentilesLineChartView
        type={ChartType.MethodResultsHistoryPercentilesLineChart}
        data={history}
        title={'Percentiles (ms)'}
        loading={loading.getMethodResultsHistory}
      />
      <NumberOfUsersLineChartView
        type={ChartType.MethodResultsHistoryNumberOfUsersLineChart}
        data={history}
        loading={loading.getMethodResultsHistory}
      />
    </Fragment>
  );
};

const getState = (state: ReduxState) => ({
  history: state.methodResultsHistory.methodResultsHistory
});
export default connect(getState)(MethodResultsHistoryChartsView);
