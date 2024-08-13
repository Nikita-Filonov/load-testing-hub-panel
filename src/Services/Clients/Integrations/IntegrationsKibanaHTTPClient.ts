import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import { GetIntegrationURLQuery } from '../../../Models/Integrations/Integrations';
import { GetKibanaDiscoverURLResponse } from '../../../Models/Integrations/IntegrationsKibana';

export class IntegrationsKibanaHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getKibanaDiscoverUrl(query: GetIntegrationURLQuery): Promise<GetKibanaDiscoverURLResponse | null> {
    const response = await this.get({ url: '/integrations-kibana/discover-url', query });
    return response.json;
  }
}
