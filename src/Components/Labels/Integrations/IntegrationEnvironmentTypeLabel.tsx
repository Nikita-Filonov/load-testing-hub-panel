import { BaseLabel, LabelColor } from '../BaseLabel';
import { FC } from 'react';
import { IntegrationEnvironmentType } from '../../../Models/Integrations/Integrations';

export const MAP_INTEGRATION_ENVIRONMENT_TYPE_TO_COLOR: Record<IntegrationEnvironmentType, LabelColor> = {
  [IntegrationEnvironmentType.Internal]: 'warning',
  [IntegrationEnvironmentType.Production]: 'success'
};

type IntegrationEnvironmentTypeLabelProps = {
  type: IntegrationEnvironmentType;
};

export const IntegrationEnvironmentTypeLabel: FC<IntegrationEnvironmentTypeLabelProps> = ({ type }) => {
  return <BaseLabel sx={{ ml: 1 }} label={type} color={MAP_INTEGRATION_ENVIRONMENT_TYPE_TO_COLOR[type]} />;
};
