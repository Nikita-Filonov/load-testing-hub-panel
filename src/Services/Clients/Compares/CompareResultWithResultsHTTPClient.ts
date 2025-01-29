import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import {
  GetCompareResultWithResultsQuery,
  GetCompareResultWithResultsResponse
} from '../../../Models/Compares/CompareResultWithResults';
import { APIResponse } from '../Models';

export class CompareResultWithResultsHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getCompareResultWithResults(
    query: GetCompareResultWithResultsQuery
  ): Promise<APIResponse<GetCompareResultWithResultsResponse>> {
    return await this.get({ url: '/compares/compare-result-with-results', query });
  }
}
