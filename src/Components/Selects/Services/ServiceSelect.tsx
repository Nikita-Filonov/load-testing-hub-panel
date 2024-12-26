import { BaseSelect } from '../BaseSelect';
import { Service } from '../../../Models/Services/Services';
import { FC } from 'react';

type ServiceSelectProps = {
  services: Service[];
  serviceId: number | null;
  onSelectService: (serviceId: number | null) => void;
};

export const ServiceSelect: FC<ServiceSelectProps> = (props) => {
  const { services, serviceId, onSelectService } = props;

  return (
    <BaseSelect
      label={'Service'}
      value={serviceId}
      options={services.map((service) => ({ value: service.id, title: service.name }))}
      onSelect={onSelectService}
      isNullable
    />
  );
};
