import { BaseLineChart } from '../../../Components/Charts/BaseLineChart';
import { BaseChartView } from '../../../Components/Charts/BaseChartView';
import { FC, useMemo } from 'react';
import dayjs from 'dayjs';
import { HistoryResult } from '../../../Models/Results/HistoryResults';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { timeValueFormatter } from '../../../Services/Charts/Utils';
import { green, red } from '@mui/material/colors';

type TotalRequestsPerSecondChartViewProps = {
  loading: boolean;
  results: HistoryResult[];
};

const valueFormatter = timeValueFormatter;

const TotalRequestsPerSecondChartView: FC<TotalRequestsPerSecondChartViewProps> = (props) => {
  const { loading, results } = props;

  const datetimeData = useMemo(() => results.map((result) => dayjs(result.datetime).toDate()), [results]);

  return (
    <BaseChartView title={'Total requests per second'} loading={loading}>
      <BaseLineChart
        xAxis={[
          { data: datetimeData, scaleType: 'time', valueFormatter },
          { data: datetimeData, scaleType: 'time', valueFormatter }
        ]}
        yAxis={[
          { data: results.map((result) => result.requestsPerSecond), label: 'Requests/s', color: green['500'] },
          { data: results.map((result) => result.failuresPerSecond), label: 'Failures/s', color: red['300'] }
        ]}
      />
    </BaseChartView>
  );
};

const getState = (state: ReduxState) => ({
  results: state.historyResults.historyResults
});
export default connect(getState)(TotalRequestsPerSecondChartView);
