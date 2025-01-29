import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import { GetResultsAnalyticsQuery } from '../../../Models/Analytics/ResultsAnalytics';
import { GetAverageAnalyticsResponse } from '../../../Models/Analytics/AverageAnalytics';
import { APIResponse } from '../Models';

export class AverageAnalyticsHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getAverageAnalytics(query: GetResultsAnalyticsQuery): Promise<APIResponse<GetAverageAnalyticsResponse>> {
    return await this.get({ url: '/average-analytics', query });
  }
}
