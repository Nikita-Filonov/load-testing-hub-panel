import { BaseMenuItem } from '../../Menus/BaseMenuItem';
import { FC } from 'react';
import { ShortIntegration } from '../../../Models/Integrations/Integrations';
import { IntegrationLabelsView } from '../../Labels/Integrations/IntegrationLabelsView';
import { MAP_INTEGRATION_SYSTEM_TYPE_TO_ICON } from '../../Labels/Integrations/IntegrationSystemTypeLabel';

type Props = {
  integration: ShortIntegration;
  onOpenIntegration: (integration: ShortIntegration) => void;
};

export const IntegrationMenuItem: FC<Props> = (props) => {
  const { integration, onOpenIntegration } = props;

  const onOpen = () => onOpenIntegration(integration);

  return (
    <BaseMenuItem
      icon={MAP_INTEGRATION_SYSTEM_TYPE_TO_ICON[integration.systemType]}
      title={`Open ${integration.name}`}
      label={<IntegrationLabelsView integration={integration} />}
      onClick={onOpen}
    />
  );
};
