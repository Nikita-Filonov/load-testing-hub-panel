import { FC } from 'react';
import { ServiceType } from '../../../Models/Services/Services';
import { BaseSelect } from '../BaseSelect';

type ServiceTypeSelectProps = {
  type: ServiceType;
  onSelectType: (type: ServiceType) => void;
};

export const ServiceTypeSelect: FC<ServiceTypeSelectProps> = (props) => {
  const { type, onSelectType } = props;

  const onSelect = (type: ServiceType | null) => type && onSelectType(type);

  return (
    <BaseSelect
      sx={{ mt: 3 }}
      label={'Type'}
      value={type}
      onSelect={onSelect}
      options={[
        { value: ServiceType.Internal, title: 'Internal' },
        { value: ServiceType.Production, title: 'Production' }
      ]}
    />
  );
};
