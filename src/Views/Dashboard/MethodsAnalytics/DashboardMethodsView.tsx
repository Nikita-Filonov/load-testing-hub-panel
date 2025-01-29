import { Fragment, useState } from 'react';
import { getDefaultAnalyticsEndDatetime, getDefaultAnalyticsStartDatetime } from '../../../Services/Analytics/Utils';
import { AnalyticsToolbarView } from '../../Analytics/AnalyticsToolbarView';
import { AnalyticsFilters } from '../../../Components/Modals/Analytics/AnalyticsFiltersModal';
import DashboardMethodsChartsView from './DashboardMethodsChartsView';

export const DashboardMethodsView = () => {
  const [filters, setFilters] = useState<AnalyticsFilters>({
    endDatetime: getDefaultAnalyticsEndDatetime(),
    startDatetime: getDefaultAnalyticsStartDatetime()
  });

  return (
    <Fragment>
      <AnalyticsToolbarView
        title={'Distribution by method'}
        filters={filters}
        setFilters={setFilters}
        containerSx={{ mt: 3 }}
      />
      <DashboardMethodsChartsView filters={filters} />
    </Fragment>
  );
};
