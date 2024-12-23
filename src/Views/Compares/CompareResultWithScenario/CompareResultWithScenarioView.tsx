import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { LoadTestResultCompareView } from '../LoadTestResultCompareView';
import { MethodResultsCompareView } from '../MethodResultsCompareView';
import { useCompares } from '../../../Providers/Compares/ComparesProvider';
import { FC, useEffect } from 'react';
import { CompareResultWithScenario } from '../../../Models/Compares/CompareResultWithScenario';
import { BoxView } from '../../../Components/Views/BoxView';
import { CompareWidgetType } from '../../../Models/Compares/CompareTableSettings';
import ScenarioDetailsView from '../../Scenarios/ScenarioDetailsView';
import { ScenariosProvider } from '../../../Providers/Services/ScenariosProvider';

type CompareResultWithScenarioViewProps = {
  compare: CompareResultWithScenario;
  loadTestResultId: number;
};

const CompareResultWithScenarioView: FC<CompareResultWithScenarioViewProps> = (props) => {
  const { compare, loadTestResultId } = props;
  const { loading, getCompareResultWithScenario } = useCompares();

  useEffect(() => {
    getCompareResultWithScenario({ loadTestResultId });
  }, [loadTestResultId]);

  return (
    <BoxView loading={loading.getCompareResultWithScenario} containerSx={{ mt: 0 }}>
      <ScenariosProvider>
        <ScenarioDetailsView widget scenarioId={compare.scenario.id} />
      </ScenariosProvider>
      <LoadTestResultCompareView
        compare={compare.loadTestResultCompare}
        widgetType={CompareWidgetType.CompareResultWithScenario}
      />
      <MethodResultsCompareView
        compares={compare.methodResultCompares}
        widgetType={CompareWidgetType.CompareResultWithScenario}
      />
    </BoxView>
  );
};

const getState = (state: ReduxState) => ({
  compare: state.compares.compareResultWithScenario
});
export default connect(getState)(CompareResultWithScenarioView);
