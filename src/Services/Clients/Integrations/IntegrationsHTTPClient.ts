import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import {
  CreateIntegrationRequest,
  GetIntegrationResponse,
  GetIntegrationsQuery,
  GetIntegrationsResponse,
  GetShortIntegrationsResponse,
  UpdateIntegrationRequest
} from '../../../Models/Integrations/Integrations';
import {
  BuildIntegrationURLRequest,
  BuildIntegrationURLResponse
} from '../../../Models/Integrations/IntegrationBuilders';
import { APIResponse } from '../Models';

export class IntegrationsHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getIntegration(integrationId: number): Promise<APIResponse<GetIntegrationResponse>> {
    return await this.get({ url: `/integrations/${integrationId}` });
  }

  async getIntegrations(query: GetIntegrationsQuery): Promise<APIResponse<GetIntegrationsResponse>> {
    return await this.get({ url: '/integrations', query });
  }

  async createIntegration(request: CreateIntegrationRequest): Promise<APIResponse<GetIntegrationResponse>> {
    return await this.post({ url: '/integrations', body: request });
  }

  async updateIntegration(
    integrationId: number,
    request: UpdateIntegrationRequest
  ): Promise<APIResponse<GetIntegrationResponse>> {
    return await this.patch({ url: `/integrations/${integrationId}`, body: request });
  }

  async deleteIntegration(integrationId: number) {
    return await this.delete({ url: `/integrations/${integrationId}` });
  }

  async buildIntegrationURL(request: BuildIntegrationURLRequest): Promise<APIResponse<BuildIntegrationURLResponse>> {
    return await this.post({ url: '/integrations/build-integration-url', body: request });
  }

  async getShortIntegrations(query: GetIntegrationsQuery): Promise<APIResponse<GetShortIntegrationsResponse>> {
    return await this.get({ url: '/integrations/short', query });
  }
}
