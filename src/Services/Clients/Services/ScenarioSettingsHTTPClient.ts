import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import { GetScenarioSettingsResponse, UpdateScenarioSettingsRequest } from '../../../Models/Services/ScenarioSettings';

export class ScenarioSettingsHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getScenarioSettings(scenarioId: number): Promise<GetScenarioSettingsResponse | null> {
    const response = await this.get({ url: `/scenario-settings/${scenarioId}` });
    return response.json;
  }

  async updateScenarioSettings(
    scenarioId: number,
    request: UpdateScenarioSettingsRequest
  ): Promise<GetScenarioSettingsResponse | null> {
    const response = await this.post({ url: `/scenario-settings/${scenarioId}`, body: request });
    return response.json;
  }
}
