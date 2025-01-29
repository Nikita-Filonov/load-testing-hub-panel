import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import {
  GetCompareResultWithAveragesQuery,
  GetCompareResultWithAveragesResponse
} from '../../../Models/Compares/CompareResultWithAverages';
import { APIResponse } from '../Models';

export class CompareResultWithAveragesHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getCompareResultWithAverages(
    query: GetCompareResultWithAveragesQuery
  ): Promise<APIResponse<GetCompareResultWithAveragesResponse>> {
    return await this.get({ url: '/compares/compare-result-with-averages', query });
  }
}
