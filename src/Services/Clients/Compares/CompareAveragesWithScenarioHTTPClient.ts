import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import {
  GetCompareAveragesWithScenarioQuery,
  GetCompareAveragesWithScenarioResponse
} from '../../../Models/Compares/CompareAveragesWithScenario';
import { APIResponse } from '../Models';

export class CompareAveragesWithScenarioHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getCompareAveragesWithScenario(
    query: GetCompareAveragesWithScenarioQuery
  ): Promise<APIResponse<GetCompareAveragesWithScenarioResponse>> {
    return await this.get({ url: '/compares/compare-averages-with-scenario', query });
  }
}
