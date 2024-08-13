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
    service.name && getAverageAnalytics({ service: service.name, scenario: scenario.name, ...filters });
  }, [service.name, scenario.name, filters]);

  return (
    <WidgetView sx={{ mt: 3 }} title={'Average numbers'} loading={loading.getAverageAnalytics}>
      <WidgetInfoRowsView>
        <BaseInfoRowView name={'Number of users'} value={analytics.numberOfUsers} />
        <BaseInfoRowView name={'Total requests'} value={analytics.totalRequests} />
        <BaseInfoRowView name={'Total failures'} value={analytics.totalFailures} />
        <BaseInfoRowView name={'Total requests per second'} value={analytics.totalRequestsPerSecond} />
        <BaseInfoRowView name={'Total failures per second'} value={analytics.totalFailuresPerSecond} />
        <BaseInfoRowView name={'Max response time'} value={analytics.maxResponseTime} />
        <BaseInfoRowView name={'Min response time'} value={analytics.minResponseTime} />
        <BaseInfoRowView name={'Average response time'} value={analytics.averageResponseTime} />
      </WidgetInfoRowsView>
    </WidgetView>
  );
};

const getState = (state: ReduxState) => ({
  service: state.services.service,
  scenario: state.scenarios.scenario,
  analytics: state.analytics.averageAnalytics
});
export default connect(getState)(AverageAnalyticsView);
