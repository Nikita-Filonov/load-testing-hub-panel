import {
  CreateIntegrationRequest,
  IntegrationEnvironmentType,
  UpdateIntegrationRequest
} from '../../Models/Integrations/Integrations';

export const getDefaultUpdateIntegrationRequest = (): UpdateIntegrationRequest => {
  return {
    name: '',
    cluster: '',
    namespace: '',
    environmentType: IntegrationEnvironmentType.Production
  };
};

export const getDefaultCreateIntegrationRequest = (): CreateIntegrationRequest => {
  return {
    ...getDefaultUpdateIntegrationRequest(),
    serviceId: 0
  };
};
