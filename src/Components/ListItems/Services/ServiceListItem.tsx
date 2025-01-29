import { Service } from '../../../Models/Services/Services';
import { FC } from 'react';
import { BaseListItem } from '../BaseListItem';
import CodeIcon from '@mui/icons-material/Code';
import { ServiceListItemMenu } from '../../Menus/Services/ServiceListItemMenu';
import { ServiceListItemLabelsView } from '../../Labels/Services/ServiceListItemLabelsView';
import { getServiceTitle } from '../../../Services/Services/Utils';

type ServiceListItemProps = {
  service: Service;
  onViewService: (service: Service) => void;
  onUpdateService: (service: Service) => void;
  onServiceDetails: (service: Service) => void;
};

export const ServiceListItem: FC<ServiceListItemProps> = (props) => {
  const { service, onViewService, onUpdateService, onServiceDetails } = props;

  const onView = () => onViewService(service);

  return (
    <BaseListItem
      menu={
        <ServiceListItemMenu service={service} onUpdateService={onUpdateService} onServiceDetails={onServiceDetails} />
      }
      icon={<CodeIcon fontSize={'small'} />}
      label={<ServiceListItemLabelsView service={service} />}
      title={getServiceTitle(service)}
      subtitle={service.url}
      onClick={onView}
    />
  );
};
