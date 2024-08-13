import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import { GetRequestsPerSecondAnalyticsResponse } from '../../../Models/Analytics/RequestsPerSecondAnalytics';
import { GetNumberOfRequestsAnalyticsResponse } from '../../../Models/Analytics/NumberOfRequestsAnalytics';
import { GetResponseTimesAnalyticsResponse } from '../../../Models/Analytics/ResponseTimesAnalytics';
import { GetMethodsAnalyticsQuery } from '../../../Models/Analytics/MethodsAnalytics';

export class MethodsAnalyticsHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getResponseTimesAnalytics(query: GetMethodsAnalyticsQuery): Promise<GetResponseTimesAnalyticsResponse | null> {
    const response = await this.get({ url: '/methods-analytics/response-times', query });
    return response.json;
  }

  async getNumberOfRequestsAnalytics(
    query: GetMethodsAnalyticsQuery
  ): Promise<GetNumberOfRequestsAnalyticsResponse | null> {
    const response = await this.get({ url: '/methods-analytics/number-of-requests', query });
    return response.json;
  }

  async getRequestsPerSecondAnalytics(
    query: GetMethodsAnalyticsQuery
  ): Promise<GetRequestsPerSecondAnalyticsResponse | null> {
    const response = await this.get({ url: '/methods-analytics/requests-per-second', query });
    return response.json;
  }
}
