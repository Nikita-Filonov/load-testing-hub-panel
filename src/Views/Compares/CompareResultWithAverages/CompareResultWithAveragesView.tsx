import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { LoadTestResultCompareView } from '../LoadTestResultCompareView';
import { MethodResultsCompareView } from '../MethodResultsCompareView';
import { FC, useEffect } from 'react';
import { CompareResultWithAverages } from '../../../Models/Compares/CompareResultWithAverages';
import { Scenario } from '../../../Models/Services/Scenarios';
import { AnalyticsFilters } from '../../../Components/Modals/Analytics/AnalyticsFiltersModal';
import { BoxView } from '../../../Components/Views/BoxView';
import { CompareWidgetType } from '../../../Models/Compares/CompareTableSettings';
import { useCompareResultWithAverages } from '../../../Providers/Compares/CompareResultWithAveragesProvider';

type CompareResultWithAveragesViewProps = {
  filters: AnalyticsFilters;
  compare: CompareResultWithAverages;
  scenario: Scenario;
  loadTestResultId: number;
};

const CompareResultWithAveragesView: FC<CompareResultWithAveragesViewProps> = (props) => {
  const { filters, compare, scenario, loadTestResultId } = props;
  const { loading, getCompareResultWithAverages } = useCompareResultWithAverages();

  useEffect(() => {
    if (loadTestResultId) {
      getCompareResultWithAverages({ ...filters, scenarioId: scenario.id, loadTestResultId });
    }
  }, [filters, scenario.id, loadTestResultId]);

  return (
    <BoxView loading={loading.getCompareResultWithAverages} containerSx={{ mt: 0 }}>
      <LoadTestResultCompareView
        compare={compare.loadTestResultCompare}
        widgetType={CompareWidgetType.CompareResultWithAverages}
      />
      <MethodResultsCompareView
        compares={compare.methodResultCompares}
        widgetType={CompareWidgetType.CompareResultWithAverages}
      />
    </BoxView>
  );
};

const getState = (state: ReduxState) => ({
  compare: state.compareResultWithAverages.compareResultWithAverages,
  scenario: state.scenarios.scenario
});
export default connect(getState)(CompareResultWithAveragesView);
