import { MainLayout } from '../../Components/Layouts/MainLayouts';
import { useParams } from 'react-router-dom';
import { LoadTestResultsProvider } from '../../Providers/Results/LoadTestResultsProvider';
import LoadTestResultDetailsView from '../../Views/Results/LoadTestResults/LoadTestResultDetailsView';
import MethodResultsView from '../../Views/Results/MethodResults/MethodResultsView';
import { LoadTestResultsHistoryProvider } from '../../Providers/Results/LoadTestResultsHistoryProvider';
import { MethodResultsProvider } from '../../Providers/Results/MethodResultsProvider';
import LoadTestResultsHistoryChartsView from '../../Views/Results/LoadTestResultsHistory/LoadTestResultsHistoryChartsView';
import { RatioResultsProvider } from '../../Providers/Results/RatioResultsProvider';
import RatioResultsView from '../../Views/Results/RatioResults/RatioResultsView';
import { LoadTestResultDetailsToolbarView } from '../../Views/Results/LoadTestResults/LoadTestResultDetailsToolbarView';
import { ExceptionResultsProvider } from '../../Providers/Results/ExceptionResultsProvider';
import ExceptionResultsView from '../../Views/Results/ExceptionResults/ExceptionResultsView';

type Params = {
  loadTestResultId: string;
};

const ResultDetailsPage = () => {
  const { loadTestResultId } = useParams<Params>();

  return (
    <MainLayout>
      {loadTestResultId && <LoadTestResultDetailsToolbarView loadTestResultId={Number(loadTestResultId)} />}
      {loadTestResultId && (
        <LoadTestResultsProvider>
          <LoadTestResultDetailsView loadTestResultId={Number(loadTestResultId)} />
        </LoadTestResultsProvider>
      )}
      {loadTestResultId && (
        <MethodResultsProvider>
          <MethodResultsView loadTestResultId={Number(loadTestResultId)} />
        </MethodResultsProvider>
      )}
      {loadTestResultId && (
        <ExceptionResultsProvider>
          <ExceptionResultsView loadTestResultId={Number(loadTestResultId)} />
        </ExceptionResultsProvider>
      )}
      {loadTestResultId && (
        <LoadTestResultsHistoryProvider>
          <LoadTestResultsHistoryChartsView loadTestResultId={Number(loadTestResultId)} />
        </LoadTestResultsHistoryProvider>
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
