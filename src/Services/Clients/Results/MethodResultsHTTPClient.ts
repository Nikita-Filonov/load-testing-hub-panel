import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import {
  GetMethodResultsComparesQuery,
  GetMethodResultsComparesResponse,
  GetMethodResultsQuery,
  GetMethodResultsResponse,
  GetMethodResultsScenarioComparesQuery,
  GetMethodResultsScenarioComparesResponse
} from '../../../Models/Results/MethodResults';

export class MethodResultsHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getMethodResults(query: GetMethodResultsQuery): Promise<GetMethodResultsResponse | null> {
    const response = await this.get({ url: '/method-results', query });
    return response.json;
  }

  async getMethodResultsCompares(
    query: GetMethodResultsComparesQuery
  ): Promise<GetMethodResultsComparesResponse | null> {
    const response = await this.get({ url: '/method-results/compares', query });
    return response.json;
  }

  async getMethodResultsScenarioCompares(
    query: GetMethodResultsScenarioComparesQuery
  ): Promise<GetMethodResultsScenarioComparesResponse | null> {
    const response = await this.get({ url: '/method-results/scenario-compares', query });
    return response.json;
  }
}
