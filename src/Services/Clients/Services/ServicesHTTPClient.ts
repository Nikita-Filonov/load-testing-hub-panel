import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import { GetServiceResponse, GetServicesQuery, GetServicesResponse } from '../../../Models/Services/Services';

export class ServicesHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getService(name: string): Promise<GetServiceResponse | null> {
    const response = await this.get({ url: `/services/${name}` });
    return response.json;
  }

  async getServices(query: GetServicesQuery): Promise<GetServicesResponse | null> {
    const response = await this.get({ url: '/services', query });
    return response.json;
  }
}
