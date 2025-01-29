import { FC } from 'react';
import { BaseListItem } from '../BaseListItem';
import { Service } from '../../../Models/Services/Services';
import CodeIcon from '@mui/icons-material/Code';
import { ServiceListItemLabelsView } from '../../Labels/Services/ServiceListItemLabelsView';
import { getServiceTitle } from '../../../Services/Services/Utils';

type Props = {
  selected: boolean;
  service: Service;
  onSelectService: (service: Service) => void;
};

export const ServiceSelectionListItem: FC<Props> = (props) => {
  const { selected, service, onSelectService } = props;

  const onSelect = () => onSelectService(service);

  return (
    <BaseListItem
      dense
      icon={<CodeIcon fontSize={'small'} />}
      label={<ServiceListItemLabelsView service={service} />}
      title={getServiceTitle(service)}
      subtitle={service.url}
      selected={selected}
      onClick={onSelect}
    />
  );
};
