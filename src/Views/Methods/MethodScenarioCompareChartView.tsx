import { connect } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import { BaseGaugeChart } from '../../Components/Charts/BaseGaugeChart';
import { getLoadTestResultCompareColor, getLoadTestResultCompareTitle } from '../../Services/Results/Utils';
import { FC, useEffect, useMemo } from 'react';
import { MethodScenarioCompare } from '../../Models/Results/Methods';
import { useMethods } from '../../Providers/Results/MethodsProvider';
import { AnalyticsFilters } from '../../Components/Modals/Analytics/AnalyticsFiltersModal';
import { Scenario } from '../../Models/Services/Scenarios';
import { BaseGaugeChartView } from '../../Components/Charts/BaseGaugeChartView';

type MethodScenarioCompareChartViewProps = {
  method: string;
  filters: AnalyticsFilters;
  compare: MethodScenarioCompare;
  scenario: Scenario;
};

const MethodScenarioCompareChartView: FC<MethodScenarioCompareChartViewProps> = (props) => {
  const { method, compare, filters, scenario } = props;
  const { loading, getMethodScenarioCompare } = useMethods();

  if (scenario.name === '') {
    return null;
  }

  useEffect(() => {
    getMethodScenarioCompare({ method, scenario: scenario.name, ...filters });
  }, [method, scenario.name, filters]);

  const title = useMemo(
    () => getLoadTestResultCompareTitle({ percent: compare.averageRequestsPerSecondCompare, context: 'SLA' }),
    [compare.averageRequestsPerSecondCompare]
  );

  return (
    <BaseGaugeChartView title={title} loading={loading.getMethodScenarioCompare}>
      <BaseGaugeChart
        value={compare.averageRequestsPerSecond}
        color={getLoadTestResultCompareColor(compare.averageRequestsPerSecondCompare)}
        height={200}
        maxValue={compare.scenarioRequestsPerSecond}
      />
    </BaseGaugeChartView>
  );
};

const getState = (state: ReduxState) => ({
  compare: state.methods.methodScenarioCompare,
  scenario: state.scenarios.scenario
});
export default connect(getState)(MethodScenarioCompareChartView);
