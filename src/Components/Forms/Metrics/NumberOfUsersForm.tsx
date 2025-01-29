import { BoxView } from '../../Views/BoxView';
import { BaseNumberTextField } from '../../TextFields/BaseNumberTextField';
import { MetricGroup, MetricName } from '../../../Models/Metrics/Base';
import { NumberOfUsers } from '../../../Models/Metrics/NumberOfUsers';

type NumberOfUsersFormProps<T extends NumberOfUsers> = {
  data: T;
  setData: (data: T) => void;
};

export const NumberOfUsersForm = <T extends NumberOfUsers>({ data, setData }: NumberOfUsersFormProps<T>) => {
  const onData = (key: keyof NumberOfUsers) => (value: number) => {
    setData({ ...data, [key]: value });
  };

  return (
    <BoxView title={MetricGroup.NumberOfUsers}>
      <BaseNumberTextField
        value={data.numberOfUsers}
        onChange={onData('numberOfUsers')}
        label={MetricName.NumberOfUsers}
      />
    </BoxView>
  );
};
