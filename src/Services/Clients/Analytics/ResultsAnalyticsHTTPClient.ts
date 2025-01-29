import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import { GetRequestsPerSecondAnalyticsResponse } from '../../../Models/Analytics/RequestsPerSecondAnalytics';
import { GetNumberOfRequestsAnalyticsResponse } from '../../../Models/Analytics/NumberOfRequestsAnalytics';
import { GetResponseTimesAnalyticsResponse } from '../../../Models/Analytics/ResponseTimesAnalytics';
import { GetResultsAnalyticsQuery } from '../../../Models/Analytics/ResultsAnalytics';
import { GetPercentilesAnalyticsResponse } from '../../../Models/Analytics/PercentilesAnalytics';
import { APIResponse } from '../Models';

export class ResultsAnalyticsHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getPercentilesAnalytics(
    query: GetResultsAnalyticsQuery
  ): Promise<APIResponse<GetPercentilesAnalyticsResponse>> {
    return await this.get({ url: '/results-analytics/percentiles', query });
  }

  async getNumberOfRequestsAnalytics(
    query: GetResultsAnalyticsQuery
  ): Promise<APIResponse<GetNumberOfRequestsAnalyticsResponse>> {
    return await this.get({ url: '/results-analytics/number-of-requests', query });
  }

  async getRequestsPerSecondAnalytics(
    query: GetResultsAnalyticsQuery
  ): Promise<APIResponse<GetRequestsPerSecondAnalyticsResponse>> {
    return await this.get({ url: '/results-analytics/requests-per-second', query });
  }

  async getResponseTimesAnalytics(
    query: GetResultsAnalyticsQuery
  ): Promise<APIResponse<GetResponseTimesAnalyticsResponse>> {
    return await this.get({ url: '/results-analytics/response-times', query });
  }
}
