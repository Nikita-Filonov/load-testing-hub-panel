import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import {
  GetMethodDetailsQuery,
  GetMethodDetailsResponse,
  GetMethodScenarioCompareQuery,
  GetMethodScenarioCompareResponse,
  GetMethodsQuery,
  GetMethodsResponse,
  GetShortMethodsQuery,
  GetShortMethodsResponse
} from '../../../Models/Results/Methods';

export class MethodsHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getMethods(query: GetMethodsQuery): Promise<GetMethodsResponse | null> {
    const response = await this.get({ url: '/methods', query });
    return response.json;
  }

  async getShortMethods(query: GetShortMethodsQuery): Promise<GetShortMethodsResponse | null> {
    const response = await this.get({ url: '/methods/short', query });
    return response.json;
  }

  async getMethodDetails(query: GetMethodDetailsQuery): Promise<GetMethodDetailsResponse | null> {
    const response = await this.get({ url: '/methods/details', query });
    return response.json;
  }

  async getMethodScenarioCompare(
    query: GetMethodScenarioCompareQuery
  ): Promise<GetMethodScenarioCompareResponse | null> {
    const response = await this.get({ url: '/methods/scenario-compare', query });
    return response.json;
  }
}
