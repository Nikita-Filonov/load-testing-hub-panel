import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import { GetCompareSettingsResponse, UpdateCompareSettingsRequest } from '../../../Models/Compares/CompareSettings';
import { APIResponse } from '../Models';

export class CompareSettingsHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getCompareSettings(serviceId: number): Promise<APIResponse<GetCompareSettingsResponse>> {
    return await this.get({ url: `/compare-settings/${serviceId}` });
  }

  async updateCompareSettings(
    serviceId: number,
    request: UpdateCompareSettingsRequest
  ): Promise<APIResponse<GetCompareSettingsResponse>> {
    return await this.patch({ url: `/compare-settings/${serviceId}`, body: request });
  }
}
