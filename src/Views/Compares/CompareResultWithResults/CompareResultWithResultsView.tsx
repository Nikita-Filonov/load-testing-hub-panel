import { CompareResultWithResults } from '../../../Models/Compares/CompareResultWithResults';
import { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { EmptyView } from '../../../Components/Views/EmptyView';
import { CompareResultWithResultsSingleView } from './CompareResultWithResultsSingleView';
import { BoxView } from '../../../Components/Views/BoxView';
import CompareResultWithResultsAverageSummaryView from './CompareResultWithResultsAverageSummaryView';
import { ShortLoadTestResult } from '../../../Models/Results/LoadTestResults';
import { INITIAL_LOAD_TEST_RESULTS } from '../../../Redux/Results/LoadTestResults/InitialState';
import { ScenariosProvider } from '../../../Providers/Services/ScenariosProvider';
import { ScenarioDetailsModal } from '../../../Components/Modals/Scenarios/ScenarioDetailsModal';
import { useCompareResultWithResults } from '../../../Providers/Compares/CompareResultWithResultsProvider';

type CompareResultWithResultsViewProps = {
  compares: CompareResultWithResults[];
  loadTestResultId: number;
  compareWithLoadTestResults: number[];
};

const CompareResultWithResultsView: FC<CompareResultWithResultsViewProps> = (props) => {
  const { compares, loadTestResultId, compareWithLoadTestResults } = props;
  const { loading, getCompareResultWithResults } = useCompareResultWithResults();
  const [result, setResult] = useState<ShortLoadTestResult>(INITIAL_LOAD_TEST_RESULTS.loadTestResultDetails);
  const [scenarioDetailsModal, setScenarioDetailsModal] = useState(false);

  useEffect(() => {
    if (compareWithLoadTestResults.length > 0) {
      getCompareResultWithResults({ loadTestResultId, compareWithLoadTestResults });
    }
  }, [loadTestResultId, compareWithLoadTestResults]);

  const onScenarioDetails = (result: ShortLoadTestResult) => {
    setResult(result);
    setScenarioDetailsModal(true);
  };

  if (compareWithLoadTestResults.length === 0 && !loading.getCompareResultWithResults) {
    return (
      <EmptyView
        containerSx={{ mt: 6, mb: 10 }}
        title={'There are no results to compare here'}
        description={'Select the results to compare, and they will be displayed here'}
      />
    );
  }

  return (
    <BoxView loading={loading.getCompareResultWithResults} containerSx={{ mt: 0 }}>
      {compares.length > 0 && (
        <CompareResultWithResultsAverageSummaryView
          loadTestResultId={loadTestResultId}
          compareWithLoadTestResults={compareWithLoadTestResults}
        />
      )}
      {compares.map((compare, index) => (
        <CompareResultWithResultsSingleView
          key={index}
          compare={compare}
          loadTestResultId={loadTestResultId}
          onScenarioDetails={onScenarioDetails}
        />
      ))}
      <ScenariosProvider>
        <ScenarioDetailsModal
          modal={scenarioDetailsModal}
          setModal={setScenarioDetailsModal}
          scenarioId={result.scenario.id}
        />
      </ScenariosProvider>
    </BoxView>
  );
};

const getState = (state: ReduxState) => ({ compares: state.compareResultWithResults.compareResultWithResults });
export default connect(getState)(CompareResultWithResultsView);
