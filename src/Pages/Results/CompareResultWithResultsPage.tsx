import { MainLayout } from '../../Components/Layouts/MainLayouts';
import { useParams } from 'react-router-dom';
import { LoadTestResultsProvider } from '../../Providers/Results/LoadTestResultsProvider';
import LoadTestResultDetailsView from '../../Views/Results/LoadTestResults/LoadTestResultDetailsView';
import CompareResultWithResultsView from '../../Views/Compares/CompareResultWithResults/CompareResultWithResultsView';
import { CompareResultWithResultsToolbarView } from '../../Views/Compares/CompareResultWithResults/CompareResultWithResultsToolbarView';
import { CompareResultWithResultsProvider } from '../../Providers/Compares/CompareResultWithResultsProvider';
import { CompareLoadTestResultsHistoryChartsView } from '../../Views/Compares/CompareLoadTestResultsHistory/CompareLoadTestResultsHistoryChartsView';
import { FC, useEffect, useState } from 'react';
import { LoadTestResultDetails } from '../../Models/Results/LoadTestResults';
import { connect } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import { Scenario } from '../../Models/Services/Scenarios';
import { CompareLoadTestResultsHistoryProvider } from '../../Providers/Compares/CompareLoadTestResultsHistoryProvider';

type Params = {
  loadTestResultId: string;
};

type CompareResultWithResultsPageProps = {
  details: LoadTestResultDetails;
  scenario: Scenario;
};

const CompareResultWithResultsPage: FC<CompareResultWithResultsPageProps> = ({ details, scenario }) => {
  const { loadTestResultId } = useParams<Params>();
  const [compareWithLoadTestResults, setCompareWithLoadTestResults] = useState<number[]>([]);

  useEffect(() => {
    if (details.compare?.previousId) {
      setCompareWithLoadTestResults([details.compare?.previousId]);
    }
  }, [details.compare]);

  useEffect(() => {
    setCompareWithLoadTestResults([]);
  }, [scenario.id]);

  return (
    <MainLayout>
      <CompareResultWithResultsToolbarView
        compareWithLoadTestResults={compareWithLoadTestResults}
        setCompareWithLoadTestResults={setCompareWithLoadTestResults}
      />
      {loadTestResultId && (
        <LoadTestResultsProvider>
          <LoadTestResultDetailsView loadTestResultId={Number(loadTestResultId)} />
        </LoadTestResultsProvider>
      )}
      {loadTestResultId && (
        <CompareResultWithResultsProvider>
          <CompareResultWithResultsView
            loadTestResultId={Number(loadTestResultId)}
            compareWithLoadTestResults={compareWithLoadTestResults}
          />
        </CompareResultWithResultsProvider>
      )}
      {loadTestResultId && (
        <CompareLoadTestResultsHistoryProvider>
          <CompareLoadTestResultsHistoryChartsView
            loadTestResultId={Number(loadTestResultId)}
            compareWithLoadTestResults={compareWithLoadTestResults}
          />
        </CompareLoadTestResultsHistoryProvider>
      )}
    </MainLayout>
  );
};

const getState = (state: ReduxState) => ({
  details: state.loadTestResults.loadTestResultDetails,
  scenario: state.scenarios.scenario
});
export default connect(getState)(CompareResultWithResultsPage);
