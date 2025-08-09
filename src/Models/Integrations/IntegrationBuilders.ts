import { IntegrationSystemType } from './Integrations';

export interface BuildIntegrationURLRequest {
  systemType: IntegrationSystemType;
  integrationId: number;
  loadTestResultId: number;
}

export interface BuildIntegrationURLResponse {
  integrationUrl: string;
}
