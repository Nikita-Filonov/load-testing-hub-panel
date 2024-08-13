import { MainLayout } from '../../Components/Layouts/MainLayouts';
import ResultsListView from '../../Views/Results/LoadTestResults/LoadTestResultsListView';
import { LoadTestResultsProvider } from '../../Providers/Results/LoadTestResultsProvider';

const ResultsPage = () => {
  return (
    <MainLayout>
      <LoadTestResultsProvider>
        <ResultsListView />
      </LoadTestResultsProvider>
    </MainLayout>
  );
};

export default ResultsPage;
