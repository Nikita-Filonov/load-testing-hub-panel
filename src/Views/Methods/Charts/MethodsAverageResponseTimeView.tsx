import { BaseChartView } from '../../../Components/Charts/BaseChartView';
import { FC } from 'react';
import { BasePieChart } from '../../../Components/Charts/BasePieChart';
import { Method } from '../../../Models/Results/Methods';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { getMethodLabel } from '../../../Services/Charts/Utils';

type MethodsAverageResponseTimeViewProps = {
  loading: boolean;
  methods: Method[];
};

const MethodsAverageResponseTimeView: FC<MethodsAverageResponseTimeViewProps> = (props) => {
  const { loading, methods } = props;

  return (
    <BaseChartView title={'Average response time by method (ms)'} loading={loading}>
      <BasePieChart
        series={methods.map((method) => ({
          label: getMethodLabel(method.method),
          value: method.averageResponseTime
        }))}
      />
    </BaseChartView>
  );
};

const getState = (state: ReduxState) => ({
  methods: state.methods.methods
});
export default connect(getState)(MethodsAverageResponseTimeView);
