import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import {
  GetExceptionResultDetailsResponse,
  GetExceptionResultsQuery,
  GetExceptionResultsResponse
} from '../../../Models/Results/ExceptionResults';

export class ExceptionResultsHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getExceptionResults(query: GetExceptionResultsQuery): Promise<GetExceptionResultsResponse | null> {
    const response = await this.get({ url: '/exception-results', query });
    return response.json;
  }

  async getExceptionResultDetails(exceptionResultId: number): Promise<GetExceptionResultDetailsResponse | null> {
    const response = await this.get({ url: `/exception-results/details/${exceptionResultId}` });
    return response.json;
  }
}
