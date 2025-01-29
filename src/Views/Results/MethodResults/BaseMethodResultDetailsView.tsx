import { Fragment } from 'react';
import { WidgetInfoRowsView } from '../../../Components/Views/WidgetInfoRowsView';
import { BaseInfoRowView } from '../../../Components/Views/BaseInfoRowView';
import { MetricName, Metrics } from '../../../Models/Metrics/Base';
import { PercentilesTable } from '../../../Components/Tables/Percentiles/PercentilesTable';
import { ContentLength } from '../../../Models/Metrics/ContentLength';

interface MethodDetails extends Metrics, ContentLength {
  method: string;
}

type BaseMethodResultDetailsViewProps<T extends MethodDetails> = {
  details: T;
};

export const BaseMethodResultDetailsView = <T extends MethodDetails>(props: BaseMethodResultDetailsViewProps<T>) => {
  const { details } = props;

  return (
    <Fragment>
      <WidgetInfoRowsView>
        <BaseInfoRowView name={'Method'} value={details.method} />
        <BaseInfoRowView name={MetricName.NumberOfRequests} value={details.numberOfRequests} />
        <BaseInfoRowView name={MetricName.RequestsPerSecond} value={details.requestsPerSecond} />
        <BaseInfoRowView name={MetricName.NumberOfFailures} value={details.numberOfFailures} />
        <BaseInfoRowView name={MetricName.FailuresPerSecond} value={details.failuresPerSecond} />
        <BaseInfoRowView name={MetricName.MaxResponseTime} value={details.maxResponseTime} />
        <BaseInfoRowView name={MetricName.MinResponseTime} value={details.minResponseTime} />
        <BaseInfoRowView name={MetricName.MedianResponseTime} value={details.medianResponseTime} />
        <BaseInfoRowView name={MetricName.AverageResponseTime} value={details.averageResponseTime} />
        <BaseInfoRowView name={MetricName.AverageContentLength} value={details.averageContentLength} />
      </WidgetInfoRowsView>
      <PercentilesTable percentiles={details} />
    </Fragment>
  );
};
