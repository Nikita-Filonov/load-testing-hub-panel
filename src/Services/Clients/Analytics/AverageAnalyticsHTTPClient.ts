import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import { GetResultsAnalyticsQuery } from '../../../Models/Analytics/ResultsAnalytics';
import {
  GetAverageAnalyticsResponse,
  GetAverageAnalyticsScenarioCompareQuery,
  GetAverageAnalyticsScenarioCompareResponse
} from '../../../Models/Analytics/AverageAnalytics';

export class AverageAnalyticsHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getAverageAnalytics(query: GetResultsAnalyticsQuery): Promise<GetAverageAnalyticsResponse | null> {
    const response = await this.get({ url: '/average-analytics', query });
    return response.json;
  }

  async getAverageAnalyticsScenarioCompare(
    query: GetAverageAnalyticsScenarioCompareQuery
  ): Promise<GetAverageAnalyticsScenarioCompareResponse | null> {
    const response = await this.get({ url: '/average-analytics/scenario-compare', query });
    return response.json;
  }
}
