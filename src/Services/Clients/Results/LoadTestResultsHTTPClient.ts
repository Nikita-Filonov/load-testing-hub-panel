import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import {
  GetLoadTestResultDetailsQuery,
  GetLoadTestResultDetailsResponse,
  GetLoadTestResultsQuery,
  GetLoadTestResultsResponse,
  UpdateLoadTestResultQuery,
  UpdateLoadTestResultRequest
} from '../../../Models/Results/LoadTestResults';
import { APIResponse } from '../Models';

export class LoadTestResultsHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getLoadTestResults(query: GetLoadTestResultsQuery): Promise<APIResponse<GetLoadTestResultsResponse>> {
    return await this.get({ url: '/load-test-results', query });
  }

  async getLoadTestResultDetails(
    loadTestResultId: number,
    query: GetLoadTestResultDetailsQuery
  ): Promise<APIResponse<GetLoadTestResultDetailsResponse>> {
    return await this.get({ url: `/load-test-results/details/${loadTestResultId}`, query });
  }

  async updateLoadTestResult(
    loadTestResultId: number,
    query: UpdateLoadTestResultQuery,
    request: UpdateLoadTestResultRequest
  ): Promise<APIResponse<GetLoadTestResultDetailsResponse>> {
    return await this.patch({ url: `/load-test-results/${loadTestResultId}`, body: request, query });
  }

  async deleteLoadTestResult(loadTestResultId: number) {
    return await this.delete({ url: `/load-test-results/${loadTestResultId}` });
  }
}
