import { Service } from '../../../Models/Services/Services';
import { FC } from 'react';
import { BaseListItem } from '../BaseListItem';
import CodeIcon from '@mui/icons-material/Code';

type ServiceListItemProps = {
  service: Service;
  selected: boolean;
  onSelectService: (service: Service) => void;
};

export const ServiceListItem: FC<ServiceListItemProps> = ({ service, selected, onSelectService }) => {
  const onSelect = () => onSelectService(service);

  return (
    <BaseListItem icon={<CodeIcon fontSize={'small'} />} title={service.name} onClick={onSelect} selected={selected} />
  );
};
