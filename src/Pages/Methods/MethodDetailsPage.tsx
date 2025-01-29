import { MainLayout } from '../../Components/Layouts/MainLayouts';
import { MethodsProvider } from '../../Providers/Methods/MethodsProvider';
import MethodDetailsView from '../../Views/Methods/MethodDetailsView';
import MethodChartsView from '../../Views/Methods/MethodChartsView';
import { useState } from 'react';
import { getDefaultAnalyticsEndDatetime, getDefaultAnalyticsStartDatetime } from '../../Services/Analytics/Utils';
import { AnalyticsToolbarView } from '../../Views/Analytics/AnalyticsToolbarView';
import { AnalyticsFilters } from '../../Components/Modals/Analytics/AnalyticsFiltersModal';
import { useMethodDetailsNavigation } from '../../Services/Methods/Hooks';
import CompareMethodWithScenarioView from '../../Views/Compares/CompareMethodWithScenario/CompareMethodWithScenarioView';
import { CompareMethodWithScenarioProvider } from '../../Providers/Compares/CompareMethodWithScenarioProvider';

const MethodDetailsPage = () => {
  const { method } = useMethodDetailsNavigation();
  const [filters, setFilters] = useState<AnalyticsFilters>({
    endDatetime: getDefaultAnalyticsEndDatetime(),
    startDatetime: getDefaultAnalyticsStartDatetime()
  });

  return (
    <MainLayout>
      {method && <AnalyticsToolbarView title={'Method details'} filters={filters} setFilters={setFilters} />}
      {method && (
        <MethodsProvider>
          <MethodDetailsView method={method} filters={filters} />
          <CompareMethodWithScenarioProvider>
            <CompareMethodWithScenarioView method={method} filters={filters} />
          </CompareMethodWithScenarioProvider>
        </MethodsProvider>
      )}
      {method && (
        <MethodsProvider>
          <MethodChartsView method={method} filters={filters} />
        </MethodsProvider>
      )}
    </MainLayout>
  );
};

export default MethodDetailsPage;
