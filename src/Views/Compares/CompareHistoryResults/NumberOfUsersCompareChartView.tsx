import { connect } from 'react-redux';
import { FC } from 'react';
import dayjs from 'dayjs';
import { CompareHistoryResults } from '../../../Models/Compares/CompareHistoryResults';
import { BaseChartView } from '../../../Components/Charts/BaseChartView';
import { BaseLineChart } from '../../../Components/Charts/BaseLineChart';
import { timeValueFormatter } from '../../../Services/Charts/Utils';
import { ReduxState } from '../../../Redux/ReduxState';

type NumberOfUsersCompareChartViewProps = {
  loading: boolean;
  compares: CompareHistoryResults[];
};

const NumberOfUsersCompareChartView: FC<NumberOfUsersCompareChartViewProps> = (props) => {
  const { compares, loading } = props;

  return (
    <BaseChartView title={'Compare number of users'} loading={loading}>
      <BaseLineChart
        xAxis={compares.map((compare) => ({
          data: compare.results.map((result) => dayjs(result.datetime).toDate()),
          scaleType: 'time',
          valueFormatter: timeValueFormatter
        }))}
        yAxis={compares.map((compare) => ({
          data: compare.results.map((result) => result.numberOfUsers),
          label: compare.title
        }))}
      />
    </BaseChartView>
  );
};

const getState = (state: ReduxState) => ({
  compares: state.compares.compareHistoryResults
});
export default connect(getState)(NumberOfUsersCompareChartView);
