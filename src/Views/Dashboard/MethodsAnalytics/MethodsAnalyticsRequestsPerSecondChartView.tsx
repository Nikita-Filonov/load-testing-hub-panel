import { FC } from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { MethodsRequestsPerSecondAnalytics } from '../../../Models/Analytics/MethodsAnalytics';
import { MethodsAnalyticsLoading } from '../../../Providers/Analytics/MethodsAnalyticsProvider';
import { MethodsAnalyticsPieChartView } from '../../../Components/Charts/Dashboard/MethodsAnalyticsPieChartView';

type MethodsAnalyticsRequestsPerSecondChartViewProps = {
  title: string;
  metric: keyof Omit<MethodsRequestsPerSecondAnalytics, 'method'>;
  loading: MethodsAnalyticsLoading;
  analytics: MethodsRequestsPerSecondAnalytics[];
};

const MethodsAnalyticsRequestsPerSecondChartView: FC<MethodsAnalyticsRequestsPerSecondChartViewProps> = (props) => {
  const { title, metric, loading, analytics } = props;

  return (
    <MethodsAnalyticsPieChartView
      data={analytics}
      title={title}
      metric={metric}
      loading={loading.getRequestsPerSecondAnalytics}
    />
  );
};

const getState = (state: ReduxState) => ({
  analytics: state.analytics.methodsRequestsPerSecondAnalytics
});
export default connect(getState)(MethodsAnalyticsRequestsPerSecondChartView);
