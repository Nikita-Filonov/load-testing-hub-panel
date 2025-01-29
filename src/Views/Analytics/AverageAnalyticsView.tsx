import { connect } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import { AverageAnalytics } from '../../Models/Analytics/AverageAnalytics';
import { FC, useEffect } from 'react';
import { WidgetView } from '../../Components/Views/WidgetView';
import { WidgetInfoRowsView } from '../../Components/Views/WidgetInfoRowsView';
import { BaseInfoRowView } from '../../Components/Views/BaseInfoRowView';
import { useAverageAnalytics } from '../../Providers/Analytics/AverageAnalyticsProvider';
import { AnalyticsFilters } from '../../Components/Modals/Analytics/AnalyticsFiltersModal';
import { Service } from '../../Models/Services/Services';
import { Scenario } from '../../Models/Services/Scenarios';
import { PercentilesTable } from '../../Components/Tables/Percentiles/PercentilesTable';
import { MetricName } from '../../Models/Metrics/Base';

type AverageAnalyticsViewProps = {
  service: Service;
  filters: AnalyticsFilters;
  scenario: Scenario;
  analytics: AverageAnalytics;
};

const AverageAnalyticsView: FC<AverageAnalyticsViewProps> = (props) => {
  const { service, filters, scenario, analytics } = props;
  const { loading, getAverageAnalytics } = useAverageAnalytics();

  useEffect(() => {
    if (service.id) {
      getAverageAnalytics({ serviceId: service.id, scenarioId: scenario.id, ...filters });
    }
  }, [service.id, scenario.id, filters]);

  return (
    <WidgetView sx={{ mt: 3 }} title={'Average numbers'} loading={loading.getAverageAnalytics}>
      <WidgetInfoRowsView>
        <BaseInfoRowView name={MetricName.NumberOfUsers} value={analytics.numberOfUsers} />
        <BaseInfoRowView name={MetricName.NumberOfRequests} value={analytics.numberOfRequests} />
        <BaseInfoRowView name={MetricName.NumberOfFailures} value={analytics.numberOfFailures} />
        <BaseInfoRowView name={MetricName.RequestsPerSecond} value={analytics.requestsPerSecond} />
        <BaseInfoRowView name={MetricName.FailuresPerSecond} value={analytics.failuresPerSecond} />
        <BaseInfoRowView name={MetricName.MaxResponseTime} value={analytics.maxResponseTime} />
        <BaseInfoRowView name={MetricName.MinResponseTime} value={analytics.minResponseTime} />
        <BaseInfoRowView name={MetricName.MedianResponseTime} value={analytics.medianResponseTime} />
        <BaseInfoRowView name={MetricName.AverageResponseTime} value={analytics.averageResponseTime} />
      </WidgetInfoRowsView>
      <PercentilesTable percentiles={analytics} />
    </WidgetView>
  );
};

const getState = (state: ReduxState) => ({
  service: state.services.service,
  scenario: state.scenarios.scenario,
  analytics: state.analytics.averageAnalytics
});
export default connect(getState)(AverageAnalyticsView);
