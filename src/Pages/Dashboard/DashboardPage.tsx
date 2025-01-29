import { MainLayout } from '../../Components/Layouts/MainLayouts';
import DashboardResultsView from '../../Views/Dashboard/DashboardResultsView';
import { ResultsAnalyticsProvider } from '../../Providers/Analytics/ResultsAnalyticsProvider';
import { DashboardMethodsView } from '../../Views/Dashboard/MethodsAnalytics/DashboardMethodsView';
import { MethodsAnalyticsProvider } from '../../Providers/Analytics/MethodsAnalyticsProvider';

const DashboardPage = () => {
  return (
    <MainLayout>
      <ResultsAnalyticsProvider>
        <DashboardResultsView />
      </ResultsAnalyticsProvider>
      <MethodsAnalyticsProvider>
        <DashboardMethodsView />
      </MethodsAnalyticsProvider>
    </MainLayout>
  );
};

export default DashboardPage;
