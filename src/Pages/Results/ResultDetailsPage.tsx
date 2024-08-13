import { MainLayout } from '../../Components/Layouts/MainLayouts';
import { useParams } from 'react-router-dom';
import { LoadTestResultsProvider } from '../../Providers/Results/LoadTestResultsProvider';
import ResultsSummaryDetailsView from '../../Views/Results/LoadTestResults/LoadTestResultDetailsView';
import MethodResultsTableView from '../../Views/Results/MethodResults/MethodResultsTableView';
import { HistoryResultsProvider } from '../../Providers/Results/HistoryResultsProvider';
import { MethodResultsProvider } from '../../Providers/Results/MethodResultsProvider';
import { HistoryResultsChartsView } from '../../Views/Results/HistoryResults/HistoryResultsChartsView';
import { RatioResultsProvider } from '../../Providers/Results/RatioResultsProvider';
import RatioResultsView from '../../Views/Results/RatioResults/RatioResultsView';
import LoadTestResultDetailsToolbarView from '../../Views/Results/LoadTestResults/LoadTestResultDetailsToolbarView';
import { ServicesProvider } from '../../Providers/Services/ServicesProvider';

type Params = {
  loadTestResultId: string;
};

const ResultDetailsPage = () => {
  const { loadTestResultId } = useParams<Params>();

  return (
    <MainLayout>
      {loadTestResultId && (
        <ServicesProvider>
          <LoadTestResultDetailsToolbarView />
        </ServicesProvider>
      )}
      {loadTestResultId && (
        <LoadTestResultsProvider>
          <ResultsSummaryDetailsView loadTestResultId={Number(loadTestResultId)} />
        </LoadTestResultsProvider>
      )}
      {loadTestResultId && (
        <MethodResultsProvider>
          <MethodResultsTableView loadTestResultId={Number(loadTestResultId)} />
        </MethodResultsProvider>
      )}
      {loadTestResultId && (
        <HistoryResultsProvider>
          <HistoryResultsChartsView loadTestResultId={Number(loadTestResultId)} />
        </HistoryResultsProvider>
      )}
      {loadTestResultId && (
        <RatioResultsProvider>
          <RatioResultsView loadTestResultId={Number(loadTestResultId)} />
        </RatioResultsProvider>
      )}
    </MainLayout>
  );
};

export default ResultDetailsPage;
