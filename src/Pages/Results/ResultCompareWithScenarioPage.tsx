import { MainLayout } from '../../Components/Layouts/MainLayouts';
import { useParams } from 'react-router-dom';
import { LoadTestResultsProvider } from '../../Providers/Results/LoadTestResultsProvider';
import ResultsSummaryDetailsView from '../../Views/Results/LoadTestResults/LoadTestResultDetailsView';
import LoadTestResultScenarioCompareView from '../../Views/Results/LoadTestResults/LoadTestResultScenarioCompareView';
import MethodResultsScenarioComparesView from '../../Views/Results/MethodResults/MethodResultsScenarioComparesView';
import { MethodResultsProvider } from '../../Providers/Results/MethodResultsProvider';
import LoadTestResultCompareToolbarView from '../../Views/Results/LoadTestResults/LoadTestResultCompareToolbarView';
import { ServicesProvider } from '../../Providers/Services/ServicesProvider';

type Params = {
  loadTestResultId: string;
};

const ResultCompareWithScenarioPage = () => {
  const { loadTestResultId } = useParams<Params>();

  return (
    <MainLayout>
      {loadTestResultId && (
        <ServicesProvider>
          <LoadTestResultCompareToolbarView title={'Compare with scenario SLA'} />
        </ServicesProvider>
      )}
      {loadTestResultId && (
        <LoadTestResultsProvider>
          <ResultsSummaryDetailsView loadTestResultId={Number(loadTestResultId)} />
        </LoadTestResultsProvider>
      )}
      {loadTestResultId && (
        <LoadTestResultsProvider>
          <LoadTestResultScenarioCompareView loadTestResultId={Number(loadTestResultId)} />
        </LoadTestResultsProvider>
      )}
      {loadTestResultId && (
        <MethodResultsProvider>
          <MethodResultsScenarioComparesView loadTestResultId={Number(loadTestResultId)} />
        </MethodResultsProvider>
      )}
    </MainLayout>
  );
};

export default ResultCompareWithScenarioPage;
