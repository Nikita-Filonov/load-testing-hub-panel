import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import { GetMethodResultsHistoryQuery } from '../../../Models/Results/MethodResultsHistory';
import { GetResultsHistoryResponse } from '../../../Models/Results/ResultsHistory';
import { APIResponse } from '../Models';

export class MethodResultsHistoryHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getMethodResultsHistory(query: GetMethodResultsHistoryQuery): Promise<APIResponse<GetResultsHistoryResponse>> {
    return await this.get({ url: '/method-results-history', query });
  }
}
