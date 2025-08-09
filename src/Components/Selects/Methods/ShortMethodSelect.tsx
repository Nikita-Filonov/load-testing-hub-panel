import { FC } from 'react';
import { ShortMethod } from '../../../Models/Methods/Methods';
import { BaseSelect } from '../BaseSelect';
import { ShortMethodSelectItem } from './ShortMethodSelectItem';

type ShortMethodSelectProps = {
  method: string;
  methods: ShortMethod[];
  onSelectMethod: (method: string) => void;
};

export const ShortMethodSelect: FC<ShortMethodSelectProps> = (props) => {
  const { method, methods, onSelectMethod } = props;

  const onSelect = (method: string | null) => method && onSelectMethod(method);

  return (
    <BaseSelect
      label={'Method'}
      value={method}
      onSelect={onSelect}
      options={methods.map((method) => ({
        value: method.method,
        title: method.method,
        content: <ShortMethodSelectItem method={method} />
      }))}
    />
  );
};
