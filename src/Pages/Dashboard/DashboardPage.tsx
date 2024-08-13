import { MainLayout } from '../../Components/Layouts/MainLayouts';
import DashboardResultsChartsView from '../../Views/Dashboard/DashboardResultsChartsView';
import { ResultsAnalyticsProvider } from '../../Providers/Analytics/ResultsAnalyticsProvider';
import { MethodsProvider } from '../../Providers/Results/MethodsProvider';
import DashboardMethodsChartsView from '../../Views/Dashboard/DashboardMethodsChartsView';

const DashboardPage = () => {
  return (
    <MainLayout>
      <ResultsAnalyticsProvider>
        <DashboardResultsChartsView />
      </ResultsAnalyticsProvider>
      <MethodsProvider>
        <DashboardMethodsChartsView />
      </MethodsProvider>
    </MainLayout>
  );
};

export default DashboardPage;
