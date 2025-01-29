import { BaseLabel, LabelColor } from '../BaseLabel';
import { FC } from 'react';
import { IntegrationEnvironmentType, ShortIntegration } from '../../../Models/Integrations/Integrations';

const MAP_INTEGRATION_ENVIRONMENT_TYPE_TO_COLOR: Record<IntegrationEnvironmentType, LabelColor> = {
  [IntegrationEnvironmentType.Internal]: 'warning',
  [IntegrationEnvironmentType.Production]: 'success'
};

type Props = {
  integration: ShortIntegration;
};

export const IntegrationEnvironmentTypeLabel: FC<Props> = ({ integration }) => {
  return (
    <BaseLabel
      sx={{ ml: 1 }}
      label={integration.environmentType}
      color={MAP_INTEGRATION_ENVIRONMENT_TYPE_TO_COLOR[integration.environmentType]}
    />
  );
};
