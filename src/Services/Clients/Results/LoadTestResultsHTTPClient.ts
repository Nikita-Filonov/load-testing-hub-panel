import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import {
  GetLoadTestResultDetailsQuery,
  GetLoadTestResultDetailsResponse,
  GetLoadTestResultScenarioCompareQuery,
  GetLoadTestResultScenarioCompareResponse,
  GetLoadTestResultsQuery,
  GetLoadTestResultsResponse
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
    query: GetLoadTestResultDetailsQuery
  ): Promise<GetLoadTestResultDetailsResponse | null> {
    const response = await this.get({ url: '/load-test-results/details', query });
    return response.json;
  }

  async getLoadTestResultScenarioCompare(
    query: GetLoadTestResultScenarioCompareQuery
  ): Promise<GetLoadTestResultScenarioCompareResponse | null> {
    const response = await this.get({ url: '/load-test-results/scenario-compare', query });
    return response.json;
  }
}
