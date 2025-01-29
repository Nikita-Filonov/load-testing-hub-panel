import { BoxView } from '../../Views/BoxView';
import { BaseNumberTextField } from '../../TextFields/BaseNumberTextField';
import { MetricGroup, MetricName } from '../../../Models/Metrics/Base';
import { ContentLength } from '../../../Models/Metrics/ContentLength';

type ContentLengthFormProps<T extends ContentLength> = {
  data: T;
  setData: (data: T) => void;
};

export const ContentLengthForm = <T extends ContentLength>({ data, setData }: ContentLengthFormProps<T>) => {
  const onData = (key: keyof ContentLength) => (value: number) => {
    setData({ ...data, [key]: value });
  };

  return (
    <BoxView title={MetricGroup.ContentLength}>
      <BaseNumberTextField
        value={data.averageContentLength}
        onChange={onData('averageContentLength')}
        label={MetricName.AverageContentLength}
      />
    </BoxView>
  );
};
