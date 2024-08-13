import { BaseLineChart } from '../../../Components/Charts/BaseLineChart';
import { BaseChartView } from '../../../Components/Charts/BaseChartView';
import { FC, useMemo } from 'react';
import dayjs from 'dayjs';
import { HistoryResultsCompare } from '../../../Models/Results/HistoryResults';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { timeValueFormatter } from '../../../Services/Charts/Utils';
import { green, purple } from '@mui/material/colors';

type TotalRequestsPerSecondCompareChartViewProps = {
  loading: boolean;
  compare: HistoryResultsCompare;
};

const valueFormatter = timeValueFormatter;

const TotalRequestsPerSecondCompareChartView: FC<TotalRequestsPerSecondCompareChartViewProps> = (props) => {
  const { loading, compare } = props;

  const currentDatetimeData = useMemo(
    () => compare.currentResults.map((result) => dayjs(result.datetime).toDate()),
    [compare.currentResults]
  );

  const previousDatetimeData = useMemo(
    () => compare.previousResults.map((result) => dayjs(result.datetime).toDate()),
    [compare.previousResults]
  );

  const currentTitle = useMemo(
    () => `Requests/s — ${compare.currentTriggerCIProjectVersion || 'current'}`,
    [compare.currentTriggerCIProjectVersion]
  );

  const previousTitle = useMemo(
    () => `Requests/s — ${compare.previousTriggerCIProjectVersion || 'previous'}`,
    [compare.previousTriggerCIProjectVersion]
  );

  return (
    <BaseChartView title={'Compare total requests per second'} loading={loading}>
      <BaseLineChart
        xAxis={[
          { data: currentDatetimeData, scaleType: 'time', valueFormatter },
          { data: previousDatetimeData, scaleType: 'time', valueFormatter }
        ]}
        yAxis={[
          {
            data: compare.currentResults.map((result) => result.requestsPerSecond),
            label: currentTitle,
            color: green['500']
          },
          {
            data: compare.previousResults.map((result) => result.requestsPerSecond),
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
export default connect(getState)(TotalRequestsPerSecondCompareChartView);
