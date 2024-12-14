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

export class LoadTestResultsHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getLoadTestResults(query: GetLoadTestResultsQuery): Promise<GetLoadTestResultsResponse | null> {
    const response = await this.get({ url: '/load-test-results', query });
    return response.json;
  }

  async getLoadTestResultDetails(
    loadTestResultId: number,
    query: GetLoadTestResultDetailsQuery
  ): Promise<GetLoadTestResultDetailsResponse | null> {
    const response = await this.get({ url: `/load-test-results/details/${loadTestResultId}`, query });
    return response.json;
  }

  async updateLoadTestResult(
    loadTestResultId: number,
    query: UpdateLoadTestResultQuery,
    request: UpdateLoadTestResultRequest
  ) {
    const response = await this.patch({ url: `/load-test-results/${loadTestResultId}`, body: request, query });
    return response.json;
  }

  async deleteLoadTestResult(loadTestResultId: number) {
    const response = await this.delete({ url: `/load-test-results/${loadTestResultId}` });
    return response.error;
  }
}
