export enum IntegrationEnvironmentType {
  Internal = 'INTERNAL',
  Production = 'PRODUCTION'
}

export interface Integration {
  id: number;
  name: string;
  cluster: string;
  namespace: string;
  environmentType: IntegrationEnvironmentType;
}

export interface UpdateIntegrationRequest {
  name: string;
  cluster: string;
  namespace: string;
  environmentType: IntegrationEnvironmentType;
}

export interface CreateIntegrationRequest extends UpdateIntegrationRequest {
  serviceId: number;
}

export interface GetIntegrationsQuery {
  serviceId: number;
}

export interface GetIntegrationResponse {
  integration: Integration;
}

export interface GetIntegrationsResponse {
  integrations: Integration[];
}
