import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import {
  GetCompareResultsHistoryNumberOfRequestsResponse,
  GetCompareResultsHistoryNumberOfUsersResponse,
  GetCompareResultsHistoryRequestsPerSecondResponse,
  GetCompareResultsHistoryResponseTimesResponse
} from '../../../Models/Compares/CompareResultsHistory';
import { GetCompareLoadTestResultsHistoryQuery } from '../../../Models/Compares/CompareLoadTestResultsHistory';
import { APIResponse } from '../Models';

export class CompareLoadTestResultsHistoryHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getCompareLoadTestResultsHistoryResponseTimes(
    query: GetCompareLoadTestResultsHistoryQuery
  ): Promise<APIResponse<GetCompareResultsHistoryResponseTimesResponse>> {
    return await this.get({ url: '/compares/compare-load-test-results-history-response-times', query });
  }

  async getCompareLoadTestResultsHistoryNumberOfUsers(
    query: GetCompareLoadTestResultsHistoryQuery
  ): Promise<APIResponse<GetCompareResultsHistoryNumberOfUsersResponse>> {
    return await this.get({ url: '/compares/compare-load-test-results-history-number-of-users', query });
  }

  async getCompareLoadTestResultsHistoryNumberOfRequests(
    query: GetCompareLoadTestResultsHistoryQuery
  ): Promise<APIResponse<GetCompareResultsHistoryNumberOfRequestsResponse>> {
    return await this.get({ url: '/compares/compare-load-test-results-history-number-of-requests', query });
  }

  async getCompareLoadTestResultsHistoryRequestsPerSecond(
    query: GetCompareLoadTestResultsHistoryQuery
  ): Promise<APIResponse<GetCompareResultsHistoryRequestsPerSecondResponse>> {
    return await this.get({
      url: '/compares/compare-load-test-results-history-requests-per-second',
      query
    });
  }
}
