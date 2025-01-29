import { IntegrationSystemType } from './Integrations';

export interface BuildIntegrationURLRequest {
  serviceId: number;
  systemType: IntegrationSystemType;
  integrationId: number;
  loadTestResultId: number;
}

export interface BuildIntegrationURLResponse {
  integrationUrl: string;
}
