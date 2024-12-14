import { BaseTableHeader } from '../BaseTableHeader';
import { MetricName } from '../../../Services/Constants/Metrics';

export const MethodResultsTableHeader = () => {
  return (
    <BaseTableHeader
      cells={[
        { value: undefined },
        { value: 'Method' },
        { value: MetricName.MaxResponseTime },
        { value: MetricName.MinResponseTime },
        { value: MetricName.NumberOfRequests },
        { value: MetricName.NumberOfFailures },
        { value: MetricName.TotalResponseTime },
        { value: MetricName.RequestsPerSecond },
        { value: MetricName.FailuresPerSecond },
        { value: MetricName.AverageResponseTime },
        { value: MetricName.AverageContentLength }
      ]}
    />
  );
};
