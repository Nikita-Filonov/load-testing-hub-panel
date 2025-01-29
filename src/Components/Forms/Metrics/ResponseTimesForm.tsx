import { ResponseTimes } from '../../../Models/Metrics/ResponseTimes';
import { BoxView } from '../../Views/BoxView';
import { BaseNumberTextField } from '../../TextFields/BaseNumberTextField';
import { MetricGroup, MetricName } from '../../../Models/Metrics/Base';

type ResponseTimesFormProps<T extends ResponseTimes> = {
  data: T;
  setData: (data: T) => void;
};

export const ResponseTimesForm = <T extends ResponseTimes>({ data, setData }: ResponseTimesFormProps<T>) => {
  const onData = (key: keyof ResponseTimes) => (value: number) => {
    setData({ ...data, [key]: value });
  };

  return (
    <BoxView title={MetricGroup.ResponseTimes}>
      <BaseNumberTextField
        value={data.minResponseTime}
        onChange={onData('minResponseTime')}
        label={MetricName.MinResponseTime}
      />
      <BaseNumberTextField
        value={data.maxResponseTime}
        onChange={onData('maxResponseTime')}
        label={MetricName.MaxResponseTime}
      />
      <BaseNumberTextField
        value={data.medianResponseTime}
        onChange={onData('medianResponseTime')}
        label={MetricName.MedianResponseTime}
      />
      <BaseNumberTextField
        value={data.averageResponseTime}
        onChange={onData('averageResponseTime')}
        label={MetricName.AverageResponseTime}
      />
    </BoxView>
  );
};
