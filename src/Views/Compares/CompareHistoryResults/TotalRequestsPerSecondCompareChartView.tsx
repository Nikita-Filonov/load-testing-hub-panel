import { ReduxState } from '../../../Redux/ReduxState';
import { CompareHistoryResults } from '../../../Models/Compares/CompareHistoryResults';
import { FC } from 'react';
import { timeValueFormatter } from '../../../Services/Charts/Utils';
import { BaseChartView } from '../../../Components/Charts/BaseChartView';
import { BaseLineChart } from '../../../Components/Charts/BaseLineChart';
import dayjs from 'dayjs';
import { connect } from 'react-redux';

type TotalRequestsPerSecondCompareChartViewProps = {
  loading: boolean;
  compares: CompareHistoryResults[];
};

const TotalRequestsPerSecondCompareChartView: FC<TotalRequestsPerSecondCompareChartViewProps> = (props) => {
  const { loading, compares } = props;

  return (
    <BaseChartView title={'Compare total requests per second'} loading={loading}>
      <BaseLineChart
        xAxis={compares.map((compare) => ({
          data: compare.results.map((result) => dayjs(result.datetime).toDate()),
          scaleType: 'time',
          valueFormatter: timeValueFormatter
        }))}
        yAxis={compares.map((compare) => ({
          data: compare.results.map((result) => result.requestsPerSecond),
          label: compare.title
        }))}
      />
    </BaseChartView>
  );
};

const getState = (state: ReduxState) => ({
  compares: state.compares.compareHistoryResults
});
export default connect(getState)(TotalRequestsPerSecondCompareChartView);
