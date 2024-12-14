import { MainLayout } from '../../Components/Layouts/MainLayouts';
import { useParams } from 'react-router-dom';
import { LoadTestResultsProvider } from '../../Providers/Results/LoadTestResultsProvider';
import ResultsSummaryDetailsView from '../../Views/Results/LoadTestResults/LoadTestResultDetailsView';
import { ComparesProvider } from '../../Providers/Compares/ComparesProvider';
import { ServicesProvider } from '../../Providers/Services/ServicesProvider';
import CompareResultWithScenarioToolbarView from '../../Views/Compares/CompareResultWithScenario/CompareResultWithScenarioToolbarView';
import CompareResultWithScenarioView from '../../Views/Compares/CompareResultWithScenario/CompareResultWithScenarioView';

type Params = {
  loadTestResultId: string;
};

const CompareResultWithScenarioPage = () => {
  const { loadTestResultId } = useParams<Params>();

  return (
    <MainLayout>
      <ServicesProvider>
        <CompareResultWithScenarioToolbarView />
      </ServicesProvider>
      {loadTestResultId && (
        <LoadTestResultsProvider>
          <ResultsSummaryDetailsView loadTestResultId={Number(loadTestResultId)} />
        </LoadTestResultsProvider>
      )}
      {loadTestResultId && (
        <ComparesProvider>
          <CompareResultWithScenarioView loadTestResultId={Number(loadTestResultId)} />
        </ComparesProvider>
      )}
    </MainLayout>
  );
};

export default CompareResultWithScenarioPage;
