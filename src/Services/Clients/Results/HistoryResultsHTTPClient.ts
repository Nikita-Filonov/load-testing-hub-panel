import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import {
  GetHistoryResultsCompareResponse,
  GetHistoryResultsQuery,
  GetHistoryResultsResponse
} from '../../../Models/Results/HistoryResults';

export class HistoryResultsHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getHistoryResults(query: GetHistoryResultsQuery): Promise<GetHistoryResultsResponse | null> {
    const response = await this.get({ url: '/history-results', query });
    return response.json;
  }

  async getHistoryResultsCompare(query: GetHistoryResultsQuery): Promise<GetHistoryResultsCompareResponse | null> {
    const response = await this.get({ url: '/history-results/compare', query });
    return response.json;
  }
}
