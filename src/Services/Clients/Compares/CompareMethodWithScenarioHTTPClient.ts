import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import {
  GetCompareMethodWithScenarioQuery,
  GetCompareMethodWithScenarioResponse
} from '../../../Models/Compares/CompareMethodWithScenario';
import { APIResponse } from '../Models';

export class CompareMethodWithScenarioHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getCompareMethodWithScenario(
    query: GetCompareMethodWithScenarioQuery
  ): Promise<APIResponse<GetCompareMethodWithScenarioResponse>> {
    return await this.get({ url: '/compares/compare-method-with-scenario', query });
  }
}
