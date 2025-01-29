import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import { GetScenarioSettingsResponse, UpdateScenarioSettingsRequest } from '../../../Models/Services/ScenarioSettings';
import { APIResponse } from '../Models';

export class ScenarioSettingsHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getScenarioSettings(scenarioId: number): Promise<APIResponse<GetScenarioSettingsResponse>> {
    return await this.get({ url: `/scenario-settings/${scenarioId}` });
  }

  async updateScenarioSettings(
    scenarioId: number,
    request: UpdateScenarioSettingsRequest
  ): Promise<APIResponse<GetScenarioSettingsResponse>> {
    return await this.patch({ url: `/scenario-settings/${scenarioId}`, body: request });
  }
}
