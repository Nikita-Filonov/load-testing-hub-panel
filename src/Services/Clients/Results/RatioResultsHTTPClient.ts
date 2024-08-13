import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import { GetRatioResultResponse } from '../../../Models/Results/RatioResults';

export class RatioResultsHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getRatioResults(loadTestResultId: number): Promise<GetRatioResultResponse | null> {
    const response = await this.get({ url: `/ratio-results/${loadTestResultId}` });
    return response.json;
  }
}
