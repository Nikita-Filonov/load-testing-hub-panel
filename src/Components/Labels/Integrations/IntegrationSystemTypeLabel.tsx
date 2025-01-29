import { BaseLabel } from '../BaseLabel';
import { FC, ReactElement } from 'react';
import { IntegrationSystemType, ShortIntegration } from '../../../Models/Integrations/Integrations';
import { GrafanaIcon } from '../../Icons/Integrations/GrafanaIcon';
import { KibanaIcon } from '../../Icons/Integrations/KibanaIcon';

type Props = {
  integration: ShortIntegration;
};

export const MAP_INTEGRATION_SYSTEM_TYPE_TO_ICON: Record<IntegrationSystemType, ReactElement> = {
  [IntegrationSystemType.Kibana]: <KibanaIcon />,
  [IntegrationSystemType.Grafana]: <GrafanaIcon />
};

export const IntegrationSystemTypeLabel: FC<Props> = ({ integration }) => {
  return (
    <BaseLabel
      sx={{ ml: 1 }}
      icon={MAP_INTEGRATION_SYSTEM_TYPE_TO_ICON[integration.systemType]}
      label={integration.systemType}
      color={'default'}
    />
  );
};
