import { useCompares } from '../../../Providers/Compares/ComparesProvider';
import { FC, useEffect } from 'react';
import { AnalyticsFilters } from '../../../Components/Modals/Analytics/AnalyticsFiltersModal';
import { Scenario } from '../../../Models/Services/Scenarios';
import { MethodResultCompare } from '../../../Models/Compares/Compares';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { Service } from '../../../Models/Services/Services';
import { MethodResultCompareView } from '../MethodResultCompareView';
import { CompareWidgetType } from '../../../Models/Compares/CompareTableSettings';

type CompareMethodWithScenarioViewProps = {
  method: string;
  filters: AnalyticsFilters;
  compare: MethodResultCompare;
  service: Service;
  scenario: Scenario;
};

const CompareMethodWithScenarioView: FC<CompareMethodWithScenarioViewProps> = (props) => {
  const { method, filters, compare, service, scenario } = props;
  const { loading, getCompareMethodWithScenario } = useCompares();

  if (!scenario.id) return null;

  useEffect(() => {
    getCompareMethodWithScenario({ ...filters, method, serviceId: service.id, scenarioId: scenario.id });
  }, [filters, method, service.id, scenario.id]);

  return (
    <MethodResultCompareView
      title={`Compare method with scenario ${scenario.name}`}
      loading={loading.getCompareMethodWithScenario}
      compare={compare}
      widgetType={CompareWidgetType.CompareMethodWithScenario}
    />
  );
};

const getState = (state: ReduxState) => ({
  compare: state.compares.compareMethodWithScenario,
  service: state.services.service,
  scenario: state.scenarios.scenario
});
export default connect(getState)(CompareMethodWithScenarioView);
