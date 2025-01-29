import { BoxView } from '../../Views/BoxView';
import { BaseNumberTextField } from '../../TextFields/BaseNumberTextField';
import { MetricGroup, MetricName } from '../../../Models/Metrics/Base';
import { RequestsPerSecond } from '../../../Models/Metrics/RequestsPerSecond';

type RequestsPerSecondFormProps<T extends RequestsPerSecond> = {
  data: T;
  setData: (data: T) => void;
};

export const RequestsPerSecondForm = <T extends RequestsPerSecond>(props: RequestsPerSecondFormProps<T>) => {
  const { data, setData } = props;

  const onData = (key: keyof RequestsPerSecond) => (value: number) => {
    setData({ ...data, [key]: value });
  };

  return (
    <BoxView title={MetricGroup.RequestsPerSecond}>
      <BaseNumberTextField
        value={data.requestsPerSecond}
        onChange={onData('requestsPerSecond')}
        label={MetricName.RequestsPerSecond}
      />
      <BaseNumberTextField
        value={data.failuresPerSecond}
        onChange={onData('failuresPerSecond')}
        label={MetricName.FailuresPerSecond}
      />
    </BoxView>
  );
};
