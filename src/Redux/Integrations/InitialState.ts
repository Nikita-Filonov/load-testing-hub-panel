import { Integration, IntegrationEnvironmentType } from '../../Models/Integrations/Integrations';

export type IntegrationsInitialState = {
  integration: Integration;
  integrations: Integration[];
};

export const INITIAL_INTEGRATIONS: IntegrationsInitialState = {
  integration: {
    id: 0,
    name: '',
    cluster: '',
    namespace: '',
    environmentType: IntegrationEnvironmentType.Production
  },
  integrations: []
};
