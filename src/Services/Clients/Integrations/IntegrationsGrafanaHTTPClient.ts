import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import { GetIntegrationURLQuery } from '../../../Models/Integrations/Integrations';
import { GetGrafanaDashboardURLResponse } from '../../../Models/Integrations/IntegrationsGrafana';

export class IntegrationsGrafanaHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getGrafanaDashboardUrl(query: GetIntegrationURLQuery): Promise<GetGrafanaDashboardURLResponse | null> {
    const response = await this.get({ url: '/integrations-grafana/dashboard-url', query });
    return response.json;
  }
}
