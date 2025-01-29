import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import {
  GetCompareResultWithScenarioQuery,
  GetCompareResultWithScenarioResponse
} from '../../../Models/Compares/CompareResultWithScenario';
import { APIResponse } from '../Models';

export class CompareResultWithScenarioHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getCompareResultWithScenario(
    query: GetCompareResultWithScenarioQuery
  ): Promise<APIResponse<GetCompareResultWithScenarioResponse>> {
    return await this.get({ url: '/compares/compare-result-with-scenario', query });
  }
}
