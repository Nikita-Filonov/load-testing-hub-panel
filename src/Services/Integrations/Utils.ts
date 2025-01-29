import {
  CreateIntegrationRequest,
  IntegrationEnvironmentType,
  IntegrationSystemType,
  UpdateIntegrationRequest
} from '../../Models/Integrations/Integrations';

export const getDefaultUpdateIntegrationRequest = (): UpdateIntegrationRequest => {
  return {
    name: '',
    systemType: IntegrationSystemType.Kibana,
    orderIndex: 0,
    urlTemplate: '',
    environmentType: IntegrationEnvironmentType.Production
  };
};

export const getDefaultCreateIntegrationRequest = (): CreateIntegrationRequest => {
  return {
    ...getDefaultUpdateIntegrationRequest(),
    serviceId: 0
  };
};
