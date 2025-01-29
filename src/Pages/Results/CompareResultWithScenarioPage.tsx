import { MainLayout } from '../../Components/Layouts/MainLayouts';
import { useParams } from 'react-router-dom';
import { LoadTestResultsProvider } from '../../Providers/Results/LoadTestResultsProvider';
import LoadTestResultDetailsView from '../../Views/Results/LoadTestResults/LoadTestResultDetailsView';
import CompareResultWithScenarioToolbarView from '../../Views/Compares/CompareResultWithScenario/CompareResultWithScenarioToolbarView';
import CompareResultWithScenarioView from '../../Views/Compares/CompareResultWithScenario/CompareResultWithScenarioView';
import { CompareResultWithScenarioProvider } from '../../Providers/Compares/CompareResultWithScenarioProvider';

type Params = {
  loadTestResultId: string;
};

const CompareResultWithScenarioPage = () => {
  const { loadTestResultId } = useParams<Params>();

  return (
    <MainLayout>
      <CompareResultWithScenarioToolbarView />
      {loadTestResultId && (
        <LoadTestResultsProvider>
          <LoadTestResultDetailsView loadTestResultId={Number(loadTestResultId)} />
        </LoadTestResultsProvider>
      )}
      {loadTestResultId && (
        <CompareResultWithScenarioProvider>
          <CompareResultWithScenarioView loadTestResultId={Number(loadTestResultId)} />
        </CompareResultWithScenarioProvider>
      )}
    </MainLayout>
  );
};

export default CompareResultWithScenarioPage;
