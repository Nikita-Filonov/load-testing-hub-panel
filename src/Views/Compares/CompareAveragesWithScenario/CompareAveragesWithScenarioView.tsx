import { Service } from '../../../Models/Services/Services';
import { Scenario } from '../../../Models/Services/Scenarios';
import { AnalyticsFilters } from '../../../Components/Modals/Analytics/AnalyticsFiltersModal';
import { LoadTestResultCompare } from '../../../Models/Compares/Compares';
import { FC, useEffect } from 'react';
import { LoadTestResultCompareView } from '../LoadTestResultCompareView';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { CompareWidgetType } from '../../../Models/Compares/CompareTableSettings';
import { useCompareAveragesWithScenario } from '../../../Providers/Compares/CompareAveragesWithScenarioProvider';

type CompareAveragesWithScenarioViewProps = {
  filters: AnalyticsFilters;
  compare: LoadTestResultCompare;
  service: Service;
  scenario: Scenario;
};

const CompareAveragesWithScenarioView: FC<CompareAveragesWithScenarioViewProps> = (props) => {
  const { filters, compare, service, scenario } = props;
  const { loading, getCompareAveragesWithScenario } = useCompareAveragesWithScenario();

  if (scenario.name === '') return null;

  useEffect(() => {
    getCompareAveragesWithScenario({ ...filters, serviceId: service.id, scenarioId: scenario.id });
  }, [filters, service.id, scenario.id]);

  return (
    <LoadTestResultCompareView
      title={`Compare average values with scenario ${scenario.name}`}
      compare={compare}
      loading={loading.getCompareAveragesWithScenario}
      widgetType={CompareWidgetType.CompareAveragesWithScenario}
    />
  );
};

const getState = (state: ReduxState) => ({
  compare: state.compareAveragesWithScenario.compareAveragesWithScenario,
  service: state.services.service,
  scenario: state.scenarios.scenario
});
export default connect(getState)(CompareAveragesWithScenarioView);
