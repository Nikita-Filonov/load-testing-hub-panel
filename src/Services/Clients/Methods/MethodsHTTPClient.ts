import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import {
  GetMethodDetailsQuery,
  GetMethodDetailsResponse,
  GetMethodsQuery,
  GetMethodsResponse,
  GetShortMethodsQuery,
  GetShortMethodsResponse
} from '../../../Models/Methods/Methods';
import { GetMethodDetailsAnalyticsQuery } from '../../../Models/Methods/Analytics';
import { GetPercentilesAnalyticsResponse } from '../../../Models/Analytics/PercentilesAnalytics';
import { GetResponseTimesAnalyticsResponse } from '../../../Models/Analytics/ResponseTimesAnalytics';
import { GetNumberOfRequestsAnalyticsResponse } from '../../../Models/Analytics/NumberOfRequestsAnalytics';
import { GetRequestsPerSecondAnalyticsResponse } from '../../../Models/Analytics/RequestsPerSecondAnalytics';
import { APIResponse } from '../Models';

export class MethodsHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getMethods(query: GetMethodsQuery): Promise<APIResponse<GetMethodsResponse>> {
    return await this.get({ url: '/methods', query });
  }

  async getShortMethods(query: GetShortMethodsQuery): Promise<APIResponse<GetShortMethodsResponse>> {
    return await this.get({ url: '/methods/short', query });
  }

  async getMethodDetails(query: GetMethodDetailsQuery): Promise<APIResponse<GetMethodDetailsResponse>> {
    return await this.get({ url: '/methods/details', query });
  }

  async getMethodDetailsPercentilesAnalytics(
    query: GetMethodDetailsAnalyticsQuery
  ): Promise<APIResponse<GetPercentilesAnalyticsResponse>> {
    return await this.get({ url: '/methods/details-percentiles-analytics', query });
  }

  async getMethodDetailsResponseTimesAnalytics(
    query: GetMethodDetailsAnalyticsQuery
  ): Promise<APIResponse<GetResponseTimesAnalyticsResponse>> {
    return await this.get({ url: '/methods/details-response-times-analytics', query });
  }

  async getMethodDetailsNumberOfRequestsAnalytics(
    query: GetMethodDetailsAnalyticsQuery
  ): Promise<APIResponse<GetNumberOfRequestsAnalyticsResponse>> {
    return await this.get({ url: '/methods/details-number-of-requests-analytics', query });
  }

  async getMethodDetailsRequestsPerSecondAnalytics(
    query: GetMethodDetailsAnalyticsQuery
  ): Promise<APIResponse<GetRequestsPerSecondAnalyticsResponse>> {
    return await this.get({ url: '/methods/details-requests-per-second-analytics', query });
  }
}
