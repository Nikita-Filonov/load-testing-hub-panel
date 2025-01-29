import { MainLayout } from '../../Components/Layouts/MainLayouts';
import { useParams } from 'react-router-dom';
import { LoadTestResultsProvider } from '../../Providers/Results/LoadTestResultsProvider';
import ResultsSummaryDetailsView from '../../Views/Results/LoadTestResults/LoadTestResultDetailsView';
import { useState } from 'react';
import { AnalyticsFilters } from '../../Components/Modals/Analytics/AnalyticsFiltersModal';
import { getDefaultAnalyticsEndDatetime, getDefaultAnalyticsStartDatetime } from '../../Services/Analytics/Utils';
import CompareResultWithAveragesView from '../../Views/Compares/CompareResultWithAverages/CompareResultWithAveragesView';
import { CompareResultWithAveragesToolbarView } from '../../Views/Compares/CompareResultWithAverages/CompareResultWithAveragesToolbarView';
import { CompareResultWithAveragesProvider } from '../../Providers/Compares/CompareResultWithAveragesProvider';

type Params = {
  loadTestResultId: string;
};

const CompareResultWithAveragesPage = () => {
  const { loadTestResultId } = useParams<Params>();
  const [filters, setFilters] = useState<AnalyticsFilters>({
    endDatetime: getDefaultAnalyticsEndDatetime(),
    startDatetime: getDefaultAnalyticsStartDatetime()
  });

  return (
    <MainLayout>
      <CompareResultWithAveragesToolbarView filters={filters} setFilters={setFilters} />
      {loadTestResultId && (
        <LoadTestResultsProvider>
          <ResultsSummaryDetailsView loadTestResultId={Number(loadTestResultId)} />
        </LoadTestResultsProvider>
      )}
      {loadTestResultId && (
        <CompareResultWithAveragesProvider>
          <CompareResultWithAveragesView filters={filters} loadTestResultId={Number(loadTestResultId)} />
        </CompareResultWithAveragesProvider>
      )}
    </MainLayout>
  );
};

export default CompareResultWithAveragesPage;
