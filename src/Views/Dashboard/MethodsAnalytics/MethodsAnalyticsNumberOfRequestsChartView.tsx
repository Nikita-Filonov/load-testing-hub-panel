import { FC } from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { MethodsNumberOfRequestsAnalytics } from '../../../Models/Analytics/MethodsAnalytics';
import { MethodsAnalyticsLoading } from '../../../Providers/Analytics/MethodsAnalyticsProvider';
import { MethodsAnalyticsPieChartView } from '../../../Components/Charts/Dashboard/MethodsAnalyticsPieChartView';

type MethodsAnalyticsNumberOfRequestsChartViewProps = {
  title: string;
  metric: keyof Omit<MethodsNumberOfRequestsAnalytics, 'method'>;
  loading: MethodsAnalyticsLoading;
  analytics: MethodsNumberOfRequestsAnalytics[];
};

const MethodsAnalyticsNumberOfRequestsChartView: FC<MethodsAnalyticsNumberOfRequestsChartViewProps> = (props) => {
  const { title, metric, loading, analytics } = props;

  return (
    <MethodsAnalyticsPieChartView
      data={analytics}
      title={title}
      metric={metric}
      loading={loading.getNumberOfRequestsAnalytics}
    />
  );
};

const getState = (state: ReduxState) => ({
  analytics: state.analytics.methodsNumberOfRequestsAnalytics
});
export default connect(getState)(MethodsAnalyticsNumberOfRequestsChartView);
