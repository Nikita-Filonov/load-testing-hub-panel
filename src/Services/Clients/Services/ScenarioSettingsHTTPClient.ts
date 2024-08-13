import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import { GetScenarioSettingsResponse, UpdateScenarioSettingsRequest } from '../../../Models/Services/ScenarioSettings';

export class ScenarioSettingsHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getScenarioSettings(scenario: string): Promise<GetScenarioSettingsResponse | null> {
    const response = await this.get({ url: `/scenario-settings/${scenario}` });
    return response.json;
  }

  async updateScenarioSettings(request: UpdateScenarioSettingsRequest): Promise<GetScenarioSettingsResponse | null> {
    const response = await this.post({ url: '/scenario-settings', body: request });
    return response.json;
  }
}
