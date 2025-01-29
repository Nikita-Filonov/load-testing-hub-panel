import { BaseLabelsView } from '../BaseLabelsView';
import { FC } from 'react';
import { ShortIntegration } from '../../../Models/Integrations/Integrations';
import { IntegrationSystemTypeLabel } from './IntegrationSystemTypeLabel';
import { IntegrationEnvironmentTypeLabel } from './IntegrationEnvironmentTypeLabel';

type Props = {
  integration: ShortIntegration;
};

export const IntegrationLabelsView: FC<Props> = ({ integration }) => {
  return (
    <BaseLabelsView>
      <IntegrationSystemTypeLabel integration={integration} />
      <IntegrationEnvironmentTypeLabel integration={integration} />
    </BaseLabelsView>
  );
};
