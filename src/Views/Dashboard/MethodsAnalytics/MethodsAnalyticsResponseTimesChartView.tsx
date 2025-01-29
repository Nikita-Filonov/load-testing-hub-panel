import { FC } from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { MethodsResponseTimesAnalytics } from '../../../Models/Analytics/MethodsAnalytics';
import { MethodsAnalyticsLoading } from '../../../Providers/Analytics/MethodsAnalyticsProvider';
import { MethodsAnalyticsPieChartView } from '../../../Components/Charts/Dashboard/MethodsAnalyticsPieChartView';
import { msValueFormatter } from '../../../Services/Charts/Utils';

type MethodsAnalyticsResponseTimesChartViewProps = {
  title: string;
  metric: keyof Omit<MethodsResponseTimesAnalytics, 'method'>;
  loading: MethodsAnalyticsLoading;
  analytics: MethodsResponseTimesAnalytics[];
};

const MethodsAnalyticsResponseTimesChartView: FC<MethodsAnalyticsResponseTimesChartViewProps> = (props) => {
  const { title, metric, loading, analytics } = props;

  return (
    <MethodsAnalyticsPieChartView
      data={analytics}
      title={title}
      metric={metric}
      loading={loading.getResponseTimesAnalytics}
      valueFormatter={(data) => msValueFormatter(data.value)}
    />
  );
};

const getState = (state: ReduxState) => ({
  analytics: state.analytics.methodsResponseTimesAnalytics
});
export default connect(getState)(MethodsAnalyticsResponseTimesChartView);
