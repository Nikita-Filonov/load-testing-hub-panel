import { connect } from 'react-redux';
import { FC } from 'react';
import dayjs from 'dayjs';
import { CompareHistoryResults } from '../../../Models/Compares/CompareHistoryResults';
import { ReduxState } from '../../../Redux/ReduxState';
import { BaseChartView } from '../../../Components/Charts/BaseChartView';
import { BaseLineChart } from '../../../Components/Charts/BaseLineChart';
import { timeValueFormatter } from '../../../Services/Charts/Utils';

type ResponseTimesCompareChartViewProps = {
  loading: boolean;
  compares: CompareHistoryResults[];
};

const ResponseTimesCompareChartView: FC<ResponseTimesCompareChartViewProps> = (props) => {
  const { loading, compares } = props;

  return (
    <BaseChartView title={'Compare response times (ms)'} loading={loading}>
      <BaseLineChart
        xAxis={compares.map((compare) => ({
          data: compare.results.map((result) => dayjs(result.datetime).toDate()),
          scaleType: 'time',
          valueFormatter: timeValueFormatter
        }))}
        yAxis={compares.map((compare) => ({
          data: compare.results.map((result) => result.averageResponseTime),
          label: compare.title
        }))}
      />
    </BaseChartView>
  );
};

const getState = (state: ReduxState) => ({
  compares: state.compares.compareHistoryResults
});
export default connect(getState)(ResponseTimesCompareChartView);
