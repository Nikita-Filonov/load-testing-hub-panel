import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import { GetRatioResultResponse } from '../../../Models/Results/RatioResults';
import { APIResponse } from '../Models';

export class RatioResultsHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getRatioResults(loadTestResultId: number): Promise<APIResponse<GetRatioResultResponse>> {
    return await this.get({ url: `/ratio-results/${loadTestResultId}` });
  }
}
