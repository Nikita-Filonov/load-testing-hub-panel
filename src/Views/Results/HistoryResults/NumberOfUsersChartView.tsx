import { BaseLineChart } from '../../../Components/Charts/BaseLineChart';
import { BaseChartView } from '../../../Components/Charts/BaseChartView';
import { ReduxState } from '../../../Redux/ReduxState';
import { connect } from 'react-redux';
import { HistoryResult } from '../../../Models/Results/HistoryResults';
import { FC, useMemo } from 'react';
import dayjs from 'dayjs';
import { timeValueFormatter } from '../../../Services/Charts/Utils';

type NumberOfUsersChartViewProps = {
  loading: boolean;
  results: HistoryResult[];
};

const valueFormatter = timeValueFormatter;

const NumberOfUsersChartView: FC<NumberOfUsersChartViewProps> = ({ results, loading }) => {
  const datetimeData = useMemo(() => results.map((result) => dayjs(result.datetime).toDate()), [results]);

  return (
    <BaseChartView title={'Number of users'} loading={loading}>
      <BaseLineChart
        xAxis={[{ data: datetimeData, scaleType: 'time', valueFormatter }]}
        yAxis={[
          {
            data: results.map((result) => result.numberOfUsers),
            label: 'Number of users',
            color: '#4e79a7'
          }
        ]}
      />
    </BaseChartView>
  );
};

const getState = (state: ReduxState) => ({
  results: state.historyResults.historyResults
});
export default connect(getState)(NumberOfUsersChartView);
