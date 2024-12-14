import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import { GetMethodResultsQuery, GetMethodResultsResponse } from '../../../Models/Results/MethodResults';

export class MethodResultsHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getMethodResults(query: GetMethodResultsQuery): Promise<GetMethodResultsResponse | null> {
    const response = await this.get({ url: '/method-results', query });
    return response.json;
  }
}
