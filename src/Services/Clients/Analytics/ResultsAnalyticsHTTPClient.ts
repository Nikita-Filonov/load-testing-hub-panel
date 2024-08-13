import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import { GetRequestsPerSecondAnalyticsResponse } from '../../../Models/Analytics/RequestsPerSecondAnalytics';
import { GetNumberOfRequestsAnalyticsResponse } from '../../../Models/Analytics/NumberOfRequestsAnalytics';
import { GetResponseTimesAnalyticsResponse } from '../../../Models/Analytics/ResponseTimesAnalytics';
import { GetResultsAnalyticsQuery } from '../../../Models/Analytics/ResultsAnalytics';

export class ResultsAnalyticsHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getNumberOfRequestsAnalytics(
    query: GetResultsAnalyticsQuery
  ): Promise<GetNumberOfRequestsAnalyticsResponse | null> {
    const response = await this.get({ url: '/results-analytics/number-of-requests', query });
    return response.json;
  }

  async getRequestsPerSecondAnalytics(
    query: GetResultsAnalyticsQuery
  ): Promise<GetRequestsPerSecondAnalyticsResponse | null> {
    const response = await this.get({ url: '/results-analytics/requests-per-second', query });
    return response.json;
  }

  async getResponseTimesAnalytics(query: GetResultsAnalyticsQuery): Promise<GetResponseTimesAnalyticsResponse | null> {
    const response = await this.get({ url: '/results-analytics/response-times', query });
    return response.json;
  }
}
