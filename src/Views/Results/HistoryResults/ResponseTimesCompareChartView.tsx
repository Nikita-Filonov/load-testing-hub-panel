import { BaseLineChart } from '../../../Components/Charts/BaseLineChart';
import { BaseChartView } from '../../../Components/Charts/BaseChartView';
import { ReduxState } from '../../../Redux/ReduxState';
import { connect } from 'react-redux';
import { HistoryResultsCompare } from '../../../Models/Results/HistoryResults';
import { FC, useMemo } from 'react';
import dayjs from 'dayjs';
import { timeValueFormatter } from '../../../Services/Charts/Utils';
import { purple } from '@mui/material/colors';

type ResponseTimesCompareChartViewProps = {
  loading: boolean;
  compare: HistoryResultsCompare;
};

const valueFormatter = timeValueFormatter;

const ResponseTimesCompareChartView: FC<ResponseTimesCompareChartViewProps> = ({ compare, loading }) => {
  const currentDatetimeData = useMemo(
    () => compare.currentResults.map((result) => dayjs(result.datetime).toDate()),
    [compare.currentResults]
  );

  const previousDatetimeData = useMemo(
    () => compare.previousResults.map((result) => dayjs(result.datetime).toDate()),
    [compare.previousResults]
  );

  const currentTitle = useMemo(
    () => `Average response time — ${compare.currentTriggerCIProjectVersion || 'current'}`,
    [compare.currentTriggerCIProjectVersion]
  );

  const previousTitle = useMemo(
    () => `Average response time — ${compare.previousTriggerCIProjectVersion || 'previous'}`,
    [compare.previousTriggerCIProjectVersion]
  );

  return (
    <BaseChartView title={'Compare response times (ms)'} loading={loading}>
      <BaseLineChart
        xAxis={[
          { data: currentDatetimeData, scaleType: 'time', valueFormatter },
          { data: previousDatetimeData, scaleType: 'time', valueFormatter }
        ]}
        yAxis={[
          {
            data: compare.currentResults.map((result) => result.averageResponseTime),
            label: currentTitle,
            color: '#edc949'
          },
          {
            data: compare.previousResults.map((result) => result.averageResponseTime),
            label: previousTitle,
            color: purple['500']
          }
        ]}
      />
    </BaseChartView>
  );
};

const getState = (state: ReduxState) => ({
  compare: state.historyResults.historyResultsCompare
});
export default connect(getState)(ResponseTimesCompareChartView);
