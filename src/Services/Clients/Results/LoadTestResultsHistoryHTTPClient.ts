import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import { GetResultsHistoryResponse } from '../../../Models/Results/ResultsHistory';
import { GetLoadTestResultsHistoryQuery } from '../../../Models/Results/LoadTestResultsHistory';
import { APIResponse } from '../Models';

export class LoadTestResultsHistoryHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getLoadTestResultsHistory(
    query: GetLoadTestResultsHistoryQuery
  ): Promise<APIResponse<GetResultsHistoryResponse>> {
    return await this.get({ url: '/load-test-results-history', query });
  }
}
