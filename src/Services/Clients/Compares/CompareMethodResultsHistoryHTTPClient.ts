import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import {
  GetCompareResultsHistoryNumberOfRequestsResponse,
  GetCompareResultsHistoryNumberOfUsersResponse,
  GetCompareResultsHistoryRequestsPerSecondResponse,
  GetCompareResultsHistoryResponseTimesResponse
} from '../../../Models/Compares/CompareResultsHistory';
import { GetCompareMethodResultsHistoryQuery } from '../../../Models/Compares/CompareMethodResultsHistory';
import { APIResponse } from '../Models';

export class CompareMethodResultsHistoryHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getCompareMethodResultsHistoryResponseTimes(
    query: GetCompareMethodResultsHistoryQuery
  ): Promise<APIResponse<GetCompareResultsHistoryResponseTimesResponse>> {
    return await this.get({ url: '/compares/compare-method-results-history-response-times', query });
  }

  async getCompareMethodResultsHistoryNumberOfUsers(
    query: GetCompareMethodResultsHistoryQuery
  ): Promise<APIResponse<GetCompareResultsHistoryNumberOfUsersResponse>> {
    return await this.get({ url: '/compares/compare-method-results-history-number-of-users', query });
  }

  async getCompareMethodResultsHistoryNumberOfRequests(
    query: GetCompareMethodResultsHistoryQuery
  ): Promise<APIResponse<GetCompareResultsHistoryNumberOfRequestsResponse>> {
    return await this.get({ url: '/compares/compare-method-results-history-number-of-requests', query });
  }

  async getCompareMethodResultsHistoryRequestsPerSecond(
    query: GetCompareMethodResultsHistoryQuery
  ): Promise<APIResponse<GetCompareResultsHistoryRequestsPerSecondResponse>> {
    return await this.get({ url: '/compares/compare-method-results-history-requests-per-second', query });
  }
}
