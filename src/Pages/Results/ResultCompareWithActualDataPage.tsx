import { MainLayout } from '../../Components/Layouts/MainLayouts';
import { useParams } from 'react-router-dom';
import { LoadTestResultsProvider } from '../../Providers/Results/LoadTestResultsProvider';
import ResultsSummaryDetailsView from '../../Views/Results/LoadTestResults/LoadTestResultDetailsView';
import LoadTestResultCompareView from '../../Views/Results/LoadTestResults/LoadTestResultCompareView';
import { MethodResultsProvider } from '../../Providers/Results/MethodResultsProvider';
import MethodResultsComparesView from '../../Views/Results/MethodResults/MethodResultsComparesView';
import LoadTestResultCompareToolbarView from '../../Views/Results/LoadTestResults/LoadTestResultCompareToolbarView';
import { HistoryResultsCompareChartsView } from '../../Views/Results/HistoryResults/HistoryResultsCompareChartsView';
import { HistoryResultsProvider } from '../../Providers/Results/HistoryResultsProvider';
import { ServicesProvider } from '../../Providers/Services/ServicesProvider';

type Params = {
  loadTestResultId: string;
};

const ResultCompareWithActualDataPage = () => {
  const { loadTestResultId } = useParams<Params>();

  return (
    <MainLayout>
      {loadTestResultId && (
        <ServicesProvider>
          <LoadTestResultCompareToolbarView title={'Compare with actual data'} />
        </ServicesProvider>
      )}
      {loadTestResultId && (
        <LoadTestResultsProvider>
          <ResultsSummaryDetailsView loadTestResultId={Number(loadTestResultId)} />
        </LoadTestResultsProvider>
      )}
      {loadTestResultId && <LoadTestResultCompareView />}
      {loadTestResultId && (
        <MethodResultsProvider>
          <MethodResultsComparesView loadTestResultId={Number(loadTestResultId)} />
        </MethodResultsProvider>
      )}
      {loadTestResultId && (
        <HistoryResultsProvider>
          <HistoryResultsCompareChartsView loadTestResultId={Number(loadTestResultId)} />
        </HistoryResultsProvider>
      )}
    </MainLayout>
  );
};

export default ResultCompareWithActualDataPage;
