export enum IntegrationSystemType {
  Kibana = 'KIBANA',
  Grafana = 'GRAFANA'
}

export enum IntegrationEnvironmentType {
  Internal = 'INTERNAL',
  Production = 'PRODUCTION'
}

export interface ShortIntegration {
  id: number;
  name: string;
  systemType: IntegrationSystemType;
  environmentType: IntegrationEnvironmentType;
}

export interface Integration extends ShortIntegration {
  orderIndex: number;
  urlTemplate: string;
}

export interface UpdateIntegrationRequest {
  name: string;
  systemType: IntegrationSystemType;
  orderIndex: number;
  urlTemplate: string;
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

export interface GetShortIntegrationsResponse {
  integrations: ShortIntegration[];
}
