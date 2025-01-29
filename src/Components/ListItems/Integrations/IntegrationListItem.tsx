import { BaseListItem } from '../BaseListItem';
import { FC } from 'react';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import { Integration } from '../../../Models/Integrations/Integrations';
import { IntegrationListItemMenu } from '../../Menus/Integrations/IntegrationListItemMenu';
import { IntegrationLabelsView } from '../../Labels/Integrations/IntegrationLabelsView';

type IntegrationListItemProps = {
  integration: Integration;
  onUpdateIntegration: (integration: Integration) => void;
  onIntegrationDetails: (integration: Integration) => void;
};

export const IntegrationListItem: FC<IntegrationListItemProps> = (props) => {
  const { integration, onUpdateIntegration, onIntegrationDetails } = props;

  const onDetails = () => onIntegrationDetails(integration);

  return (
    <BaseListItem
      menu={
        <IntegrationListItemMenu
          integration={integration}
          onUpdateIntegration={onUpdateIntegration}
          onIntegrationDetails={onIntegrationDetails}
        />
      }
      icon={<HubOutlinedIcon fontSize={'small'} />}
      title={integration.name}
      subtitle={`Order index: ${integration.orderIndex}`}
      label={<IntegrationLabelsView integration={integration} />}
      onClick={onDetails}
    />
  );
};
