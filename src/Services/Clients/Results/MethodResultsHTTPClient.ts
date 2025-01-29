import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import {
  GetMethodResultDetailsQuery,
  GetMethodResultDetailsResponse,
  GetMethodResultsQuery,
  GetMethodResultsResponse
} from '../../../Models/Results/MethodResults';
import { APIResponse } from '../Models';

export class MethodResultsHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getMethodResults(query: GetMethodResultsQuery): Promise<APIResponse<GetMethodResultsResponse>> {
    return await this.get({ url: '/method-results', query });
  }

  async getMethodResultDetails(
    methodResultId: number,
    query: GetMethodResultDetailsQuery
  ): Promise<APIResponse<GetMethodResultDetailsResponse>> {
    return await this.get({ url: `/method-results/details/${methodResultId}`, query });
  }
}
