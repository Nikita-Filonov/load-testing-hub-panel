import { BaseLabel, LabelColor } from '../BaseLabel';
import { ServiceType } from '../../../Models/Services/Services';
import { FC } from 'react';

export const MAP_SERVICE_TYPE_TO_COLOR: Record<ServiceType, LabelColor> = {
  [ServiceType.Internal]: 'warning',
  [ServiceType.Production]: 'success'
};

type ServiceTypeLabelProps = {
  type: ServiceType;
};

export const ServiceTypeLabel: FC<ServiceTypeLabelProps> = ({ type }) => {
  return <BaseLabel sx={{ ml: 1 }} label={type} color={MAP_SERVICE_TYPE_TO_COLOR[type]} />;
};
