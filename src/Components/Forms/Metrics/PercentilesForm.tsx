import { BoxView } from '../../Views/BoxView';
import { BaseNumberTextField } from '../../TextFields/BaseNumberTextField';
import { Percentiles } from '../../../Models/Metrics/Percentiles';
import { MetricGroup, MetricName } from '../../../Models/Metrics/Base';

type PercentilesFormProps<T extends Percentiles> = {
  data: T;
  setData: (data: T) => void;
};

export const PercentilesForm = <T extends Percentiles>({ data, setData }: PercentilesFormProps<T>) => {
  const onData = (key: keyof Percentiles) => (value: number) => {
    setData({ ...data, [key]: value });
  };

  return (
    <BoxView title={MetricGroup.Percentiles}>
      <BaseNumberTextField
        value={data.responseTimePercentile50}
        onChange={onData('responseTimePercentile50')}
        label={MetricName.ResponseTimePercentile50}
      />
      <BaseNumberTextField
        value={data.responseTimePercentile60}
        onChange={onData('responseTimePercentile60')}
        label={MetricName.ResponseTimePercentile60}
      />
      <BaseNumberTextField
        value={data.responseTimePercentile70}
        onChange={onData('responseTimePercentile70')}
        label={MetricName.ResponseTimePercentile70}
      />
      <BaseNumberTextField
        value={data.responseTimePercentile80}
        onChange={onData('responseTimePercentile80')}
        label={MetricName.ResponseTimePercentile80}
      />
      <BaseNumberTextField
        value={data.responseTimePercentile90}
        onChange={onData('responseTimePercentile90')}
        label={MetricName.ResponseTimePercentile90}
      />
      <BaseNumberTextField
        value={data.responseTimePercentile95}
        onChange={onData('responseTimePercentile95')}
        label={MetricName.ResponseTimePercentile95}
      />
      <BaseNumberTextField
        value={data.responseTimePercentile99}
        onChange={onData('responseTimePercentile99')}
        label={MetricName.ResponseTimePercentile99}
      />
      <BaseNumberTextField
        value={data.responseTimePercentile100}
        onChange={onData('responseTimePercentile100')}
        label={MetricName.ResponseTimePercentile100}
      />
    </BoxView>
  );
};
