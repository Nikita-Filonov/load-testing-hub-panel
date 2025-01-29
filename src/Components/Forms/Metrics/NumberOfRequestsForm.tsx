import { BoxView } from '../../Views/BoxView';
import { BaseNumberTextField } from '../../TextFields/BaseNumberTextField';
import { NumberOfRequests } from '../../../Models/Metrics/NumberOfRequests';
import { MetricGroup, MetricName } from '../../../Models/Metrics/Base';

type NumberOfRequestsFormProps<T extends NumberOfRequests> = {
  data: T;
  setData: (data: T) => void;
};

export const NumberOfRequestsForm = <T extends NumberOfRequests>({ data, setData }: NumberOfRequestsFormProps<T>) => {
  const onData = (key: keyof NumberOfRequests) => (value: number) => {
    setData({ ...data, [key]: value });
  };

  return (
    <BoxView title={MetricGroup.NumberOfRequests}>
      <BaseNumberTextField
        value={data.numberOfRequests}
        onChange={onData('numberOfRequests')}
        label={MetricName.NumberOfRequests}
      />
      <BaseNumberTextField
        value={data.numberOfFailures}
        onChange={onData('numberOfFailures')}
        label={MetricName.NumberOfFailures}
      />
    </BoxView>
  );
};
