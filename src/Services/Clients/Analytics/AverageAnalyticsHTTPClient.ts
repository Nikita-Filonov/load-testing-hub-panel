import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import { GetResultsAnalyticsQuery } from '../../../Models/Analytics/ResultsAnalytics';
import { GetAverageAnalyticsResponse } from '../../../Models/Analytics/AverageAnalytics';

export class AverageAnalyticsHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getAverageAnalytics(query: GetResultsAnalyticsQuery): Promise<GetAverageAnalyticsResponse | null> {
    const response = await this.get({ url: '/average-analytics', query });
    return response.json;
  }
}
