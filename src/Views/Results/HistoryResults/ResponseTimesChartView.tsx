import { BaseLineChart } from '../../../Components/Charts/BaseLineChart';
import { BaseChartView } from '../../../Components/Charts/BaseChartView';
import { ReduxState } from '../../../Redux/ReduxState';
import { connect } from 'react-redux';
import { HistoryResult } from '../../../Models/Results/HistoryResults';
import { FC, useMemo } from 'react';
import dayjs from 'dayjs';
import { timeValueFormatter } from '../../../Services/Charts/Utils';

type ResponseTimesChartViewProps = {
  loading: boolean;
  results: HistoryResult[];
};

const valueFormatter = timeValueFormatter;

const ResponseTimesChartView: FC<ResponseTimesChartViewProps> = ({ results, loading }) => {
  const datetimeData = useMemo(() => results.map((result) => dayjs(result.datetime).toDate()), [results]);

  return (
    <BaseChartView title={'Response times (ms)'} loading={loading}>
      <BaseLineChart
        xAxis={[
          { data: datetimeData, scaleType: 'time', valueFormatter },
          { data: datetimeData, scaleType: 'time', valueFormatter }
        ]}
        yAxis={[
          {
            data: results.map((result) => result.averageResponseTime),
            label: 'Average response time',
            color: '#edc949'
          },
          {
            data: results.map((result) => result.responseTimePercentile95),
            label: '95th percentile',
            color: '#683294'
          }
        ]}
      />
    </BaseChartView>
  );
};

const getState = (state: ReduxState) => ({
  results: state.historyResults.historyResults
});
export default connect(getState)(ResponseTimesChartView);
