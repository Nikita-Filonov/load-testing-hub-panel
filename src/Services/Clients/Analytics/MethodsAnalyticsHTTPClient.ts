import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import {
  GetMethodsAnalyticsQuery,
  GetMethodsNumberOfRequestsAnalyticsResponse,
  GetMethodsRequestsPerSecondAnalyticsResponse,
  GetMethodsResponseTimesAnalyticsResponse
} from '../../../Models/Analytics/MethodsAnalytics';
import { APIResponse } from '../Models';

export class MethodsAnalyticsHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getResponseTimesAnalytics(
    query: GetMethodsAnalyticsQuery
  ): Promise<APIResponse<GetMethodsResponseTimesAnalyticsResponse>> {
    return await this.get({ url: '/methods-analytics/response-times', query });
  }

  async getNumberOfRequestsAnalytics(
    query: GetMethodsAnalyticsQuery
  ): Promise<APIResponse<GetMethodsNumberOfRequestsAnalyticsResponse>> {
    return await this.get({ url: '/methods-analytics/number-of-requests', query });
  }

  async getRequestsPerSecondAnalytics(
    query: GetMethodsAnalyticsQuery
  ): Promise<APIResponse<GetMethodsRequestsPerSecondAnalyticsResponse>> {
    return await this.get({ url: '/methods-analytics/requests-per-second', query });
  }
}
