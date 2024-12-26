import { Service } from '../../../Models/Services/Services';
import { FC } from 'react';
import { BaseListItem } from '../BaseListItem';
import CodeIcon from '@mui/icons-material/Code';
import { ServiceListItemMenu } from '../../Menus/Services/ServiceListItemMenu';
import { ServiceListItemTitleLink } from '../../Links/Services/ServiceListItemTitleLink';

type ServiceListItemProps = {
  service: Service;
  onUpdateService: (service: Service) => void;
  onServiceDetails: (service: Service) => void;
};

export const ServiceListItem: FC<ServiceListItemProps> = (props) => {
  const { service, onUpdateService, onServiceDetails } = props;

  const onDetails = () => onServiceDetails(service);

  return (
    <BaseListItem
      menu={
        <ServiceListItemMenu service={service} onUpdateService={onUpdateService} onServiceDetails={onServiceDetails} />
      }
      icon={<CodeIcon fontSize={'small'} />}
      title={<ServiceListItemTitleLink service={service} />}
      subtitle={service.url}
      onClick={onDetails}
    />
  );
};
