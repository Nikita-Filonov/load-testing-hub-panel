import { MainLayout } from '../../Components/Layouts/MainLayouts';
import { useParams } from 'react-router-dom';
import { LoadTestResultsProvider } from '../../Providers/Results/LoadTestResultsProvider';
import LoadTestResultDetailsView from '../../Views/Results/LoadTestResults/LoadTestResultDetailsView';
import CompareResultWithResultsView from '../../Views/Compares/CompareResultWithResults/CompareResultWithResultsView';
import { CompareResultWithResultsToolbarView } from '../../Views/Compares/CompareResultWithResults/CompareResultWithResultsToolbarView';
import { ComparesProvider } from '../../Providers/Compares/ComparesProvider';
import CompareHistoryResultsView from '../../Views/Compares/CompareHistoryResults/CompareHistoryResultsView';
import { FC, useEffect, useState } from 'react';
import { LoadTestResultDetails } from '../../Models/Results/LoadTestResults';
import { connect } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import { Scenario } from '../../Models/Services/Scenarios';
import { IntegrationsProvider } from '../../Providers/Integrations/IntegrationsProvider';

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
    details.compare?.previousId && setCompareWithLoadTestResults([details.compare?.previousId]);
  }, [details.compare]);

  useEffect(() => {
    setCompareWithLoadTestResults([]);
  }, [scenario.id]);

  return (
    <MainLayout>
      <IntegrationsProvider>
        <CompareResultWithResultsToolbarView
          compareWithLoadTestResults={compareWithLoadTestResults}
          setCompareWithLoadTestResults={setCompareWithLoadTestResults}
        />
      </IntegrationsProvider>
      {loadTestResultId && (
        <LoadTestResultsProvider>
          <LoadTestResultDetailsView loadTestResultId={Number(loadTestResultId)} />
        </LoadTestResultsProvider>
      )}
      {loadTestResultId && (
        <ComparesProvider>
          <CompareResultWithResultsView
            loadTestResultId={Number(loadTestResultId)}
            compareWithLoadTestResults={compareWithLoadTestResults}
          />
        </ComparesProvider>
      )}
      {loadTestResultId && (
        <ComparesProvider>
          <CompareHistoryResultsView
            loadTestResultId={Number(loadTestResultId)}
            compareWithLoadTestResults={compareWithLoadTestResults}
          />
        </ComparesProvider>
      )}
    </MainLayout>
  );
};

const getState = (state: ReduxState) => ({
  details: state.loadTestResults.loadTestResultDetails,
  scenario: state.scenarios.scenario
});
export default connect(getState)(CompareResultWithResultsPage);
