import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import { GetCompareSettingsResponse, UpdateCompareSettingsRequest } from '../../../Models/Compares/CompareSettings';

export class CompareSettingsHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getCompareSettings(serviceId: number): Promise<GetCompareSettingsResponse | null> {
    const response = await this.get({ url: `/compare-settings/${serviceId}` });
    return response.json;
  }

  async updateCompareSettings(
    serviceId: number,
    request: UpdateCompareSettingsRequest
  ): Promise<GetCompareSettingsResponse | null> {
    const response = await this.patch({ url: `/compare-settings/${serviceId}`, body: request });
    return response.json;
  }
}
