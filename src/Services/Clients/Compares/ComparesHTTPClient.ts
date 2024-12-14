import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import {
  GetCompareResultWithResultsQuery,
  GetCompareResultWithResultsResponse
} from '../../../Models/Compares/CompareResultWithResults';
import {
  GetCompareResultWithAveragesQuery,
  GetCompareResultWithAveragesResponse
} from '../../../Models/Compares/CompareResultWithAverages';
import {
  GetCompareResultWithScenarioQuery,
  GetCompareResultWithScenarioResponse
} from '../../../Models/Compares/CompareResultWithScenario';
import {
  GetCompareMethodWithScenarioQuery,
  GetCompareMethodWithScenarioResponse
} from '../../../Models/Compares/CompareMethodWithScenario';
import { GetCompareHistoryResultsResponse } from '../../../Models/Compares/CompareHistoryResults';
import {
  GetCompareAveragesWithScenarioQuery,
  GetCompareAveragesWithScenarioResponse
} from '../../../Models/Compares/CompareAveragesWithScenario';

export class ComparesHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getCompareHistoryResults(
    query: GetCompareResultWithResultsQuery
  ): Promise<GetCompareHistoryResultsResponse | null> {
    const response = await this.get({ url: '/compares/compare-history-results', query });
    return response.json;
  }

  async getCompareResultWithResults(
    query: GetCompareResultWithResultsQuery
  ): Promise<GetCompareResultWithResultsResponse | null> {
    const response = await this.get({ url: '/compares/compare-result-with-results', query });
    return response.json;
  }

  async getCompareResultWithAverages(
    query: GetCompareResultWithAveragesQuery
  ): Promise<GetCompareResultWithAveragesResponse | null> {
    const response = await this.get({ url: '/compares/compare-result-with-averages', query });
    return response.json;
  }

  async getCompareResultWithScenario(
    query: GetCompareResultWithScenarioQuery
  ): Promise<GetCompareResultWithScenarioResponse | null> {
    const response = await this.get({ url: '/compares/compare-result-with-scenario', query });
    return response.json;
  }

  async getCompareMethodWithScenario(
    query: GetCompareMethodWithScenarioQuery
  ): Promise<GetCompareMethodWithScenarioResponse | null> {
    const response = await this.get({ url: '/compares/compare-method-with-scenario', query });
    return response.json;
  }

  async getCompareAveragesWithScenario(
    query: GetCompareAveragesWithScenarioQuery
  ): Promise<GetCompareAveragesWithScenarioResponse | null> {
    const response = await this.get({ url: '/compares/compare-averages-with-scenario', query });
    return response.json;
  }
}
