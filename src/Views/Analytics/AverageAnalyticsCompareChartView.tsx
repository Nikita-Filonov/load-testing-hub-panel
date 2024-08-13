import { getLoadTestResultCompareColor, getLoadTestResultCompareTitle } from '../../Services/Results/Utils';
import { connect } from 'react-redux';
import { useAverageAnalytics } from '../../Providers/Analytics/AverageAnalyticsProvider';
import { FC, useEffect, useMemo } from 'react';
import { ReduxState } from '../../Redux/ReduxState';
import { Service } from '../../Models/Services/Services';
import { Scenario } from '../../Models/Services/Scenarios';
import { BaseGaugeChart } from '../../Components/Charts/BaseGaugeChart';
import { AverageAnalyticsScenarioCompare } from '../../Models/Analytics/AverageAnalytics';
import { AnalyticsFilters } from '../../Components/Modals/Analytics/AnalyticsFiltersModal';
import { BaseGaugeChartView } from '../../Components/Charts/BaseGaugeChartView';

type AverageAnalyticsCompareChartViewProps = {
  compare: AverageAnalyticsScenarioCompare;
  service: Service;
  scenario: Scenario;
  filters: AnalyticsFilters;
};

const AverageAnalyticsCompareChartView: FC<AverageAnalyticsCompareChartViewProps> = (props) => {
  const { compare, service, scenario, filters } = props;
  const { loading, getAverageAnalyticsScenarioCompare } = useAverageAnalytics();

  if (scenario.name === '') {
    return null;
  }

  useEffect(() => {
    getAverageAnalyticsScenarioCompare({
      service: service.name,
      scenario: scenario.name,
      ...filters
    });
  }, [service.name, scenario.name, filters]);

  const title = useMemo(
    () => getLoadTestResultCompareTitle({ percent: compare.totalRequestsPerSecondCompare, context: 'SLA' }),
    [compare.totalRequestsPerSecondCompare]
  );

  return (
    <BaseGaugeChartView title={title} loading={loading.getAverageAnalyticsScenarioCompare}>
      <BaseGaugeChart
        value={compare.totalRequestsPerSecond}
        color={getLoadTestResultCompareColor(compare.totalRequestsPerSecondCompare)}
        height={200}
        maxValue={compare.scenarioTotalRequestsPerSecond}
      />
    </BaseGaugeChartView>
  );
};

const getState = (state: ReduxState) => ({
  compare: state.analytics.averageAnalyticsScenarioCompare,
  service: state.services.service,
  scenario: state.scenarios.scenario
});
export default connect(getState)(AverageAnalyticsCompareChartView);
