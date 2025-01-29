import {
  Integration,
  IntegrationEnvironmentType,
  IntegrationSystemType,
  ShortIntegration
} from '../../Models/Integrations/Integrations';

export type IntegrationsInitialState = {
  integration: Integration;
  integrations: Integration[];
  shortIntegrations: ShortIntegration[];
};

export const INITIAL_INTEGRATIONS: IntegrationsInitialState = {
  integration: {
    id: 0,
    name: '',
    systemType: IntegrationSystemType.Kibana,
    orderIndex: 0,
    urlTemplate: '',
    environmentType: IntegrationEnvironmentType.Production
  },
  integrations: [],
  shortIntegrations: []
};
