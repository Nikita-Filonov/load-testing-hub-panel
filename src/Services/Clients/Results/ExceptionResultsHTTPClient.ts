import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import {
  GetExceptionResultDetailsResponse,
  GetExceptionResultsQuery,
  GetExceptionResultsResponse
} from '../../../Models/Results/ExceptionResults';
import { APIResponse } from '../Models';

export class ExceptionResultsHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getExceptionResults(query: GetExceptionResultsQuery): Promise<APIResponse<GetExceptionResultsResponse>> {
    return await this.get({ url: '/exception-results', query });
  }

  async getExceptionResultDetails(exceptionResultId: number): Promise<APIResponse<GetExceptionResultDetailsResponse>> {
    return await this.get({ url: `/exception-results/details/${exceptionResultId}` });
  }
}
