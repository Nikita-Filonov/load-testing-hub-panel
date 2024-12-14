import { MainLayout } from '../../Components/Layouts/MainLayouts';
import { useParams } from 'react-router-dom';
import { LoadTestResultsProvider } from '../../Providers/Results/LoadTestResultsProvider';
import ResultsSummaryDetailsView from '../../Views/Results/LoadTestResults/LoadTestResultDetailsView';
import { ComparesProvider } from '../../Providers/Compares/ComparesProvider';
import { ServicesProvider } from '../../Providers/Services/ServicesProvider';
import { useState } from 'react';
import { AnalyticsFilters } from '../../Components/Modals/Analytics/AnalyticsFiltersModal';
import { getDefaultAnalyticsEndDatetime, getDefaultAnalyticsStartDatetime } from '../../Services/Analytics/Utils';
import CompareResultWithAveragesView from '../../Views/Compares/CompareResultWithAverages/CompareResultWithAveragesView';
import { CompareResultWithAveragesToolbarView } from '../../Views/Compares/CompareResultWithAverages/CompareResultWithAveragesToolbarView';

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
      <ServicesProvider>
        <CompareResultWithAveragesToolbarView filters={filters} setFilters={setFilters} />
      </ServicesProvider>
      {loadTestResultId && (
        <LoadTestResultsProvider>
          <ResultsSummaryDetailsView loadTestResultId={Number(loadTestResultId)} />
        </LoadTestResultsProvider>
      )}
      {loadTestResultId && (
        <ComparesProvider>
          <CompareResultWithAveragesView filters={filters} loadTestResultId={Number(loadTestResultId)} />
        </ComparesProvider>
      )}
    </MainLayout>
  );
};

export default CompareResultWithAveragesPage;
