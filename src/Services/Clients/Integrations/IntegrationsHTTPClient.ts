import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import {
  CreateIntegrationRequest,
  GetIntegrationResponse,
  GetIntegrationsQuery,
  GetIntegrationsResponse,
  UpdateIntegrationRequest
} from '../../../Models/Integrations/Integrations';
import {
  BuildGrafanaDashboardURLResponse,
  BuildIntegrationURLRequest,
  BuildKibanaDiscoverURLResponse
} from '../../../Models/Integrations/IntegrationBuilders';

export class IntegrationsHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getIntegration(integrationId: number): Promise<GetIntegrationResponse | null> {
    const response = await this.get({ url: `/integrations/${integrationId}` });
    return response.json;
  }

  async getIntegrations(query: GetIntegrationsQuery): Promise<GetIntegrationsResponse | null> {
    const response = await this.get({ url: '/integrations', query });
    return response.json;
  }

  async createIntegration(request: CreateIntegrationRequest): Promise<GetIntegrationResponse | null> {
    const response = await this.post({ url: '/integrations', body: request });
    return response.json;
  }

  async updateIntegration(
    integrationId: number,
    request: UpdateIntegrationRequest
  ): Promise<GetIntegrationResponse | null> {
    const response = await this.patch({ url: `/integrations/${integrationId}`, body: request });
    return response.json;
  }

  async deleteIntegration(integrationId: number) {
    const response = await this.delete({ url: `/integrations/${integrationId}` });
    return response.error;
  }

  async buildKibanaDiscoverURL(request: BuildIntegrationURLRequest): Promise<BuildKibanaDiscoverURLResponse | null> {
    const response = await this.post({ url: '/integrations/build-kibana-discover-url', body: request });
    return response.json;
  }

  async buildGrafanaDiscoverURL(request: BuildIntegrationURLRequest): Promise<BuildGrafanaDashboardURLResponse | null> {
    const response = await this.post({ url: '/integrations/build-grafana-dashboard-url', body: request });
    return response.json;
  }
}
