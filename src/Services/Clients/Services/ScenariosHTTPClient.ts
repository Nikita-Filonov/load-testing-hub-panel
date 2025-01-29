import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import {
  CreateScenarioRequest,
  GetScenarioDetailsResponse,
  GetScenarioResponse,
  GetScenariosQuery,
  GetScenariosResponse,
  UpdateScenarioRequest
} from '../../../Models/Services/Scenarios';
import { APIResponse } from '../Models';

export class ScenariosHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getScenario(scenarioId: number): Promise<APIResponse<GetScenarioResponse>> {
    return await this.get({ url: `/scenarios/${scenarioId}` });
  }

  async getScenarios(query: GetScenariosQuery): Promise<APIResponse<GetScenariosResponse>> {
    return await this.get({ url: '/scenarios', query });
  }

  async createScenario(request: CreateScenarioRequest): Promise<APIResponse<GetScenarioDetailsResponse>> {
    return await this.post({ url: '/scenarios', body: request });
  }

  async updateScenario(
    scenarioId: number,
    request: UpdateScenarioRequest
  ): Promise<APIResponse<GetScenarioDetailsResponse>> {
    return await this.patch({ url: `/scenarios/${scenarioId}`, body: request });
  }

  async deleteScenario(scenarioId: number) {
    return await this.delete({ url: `/scenarios/${scenarioId}` });
  }

  async getScenarioDetails(scenarioId: number): Promise<APIResponse<GetScenarioDetailsResponse>> {
    return await this.get({ url: `/scenarios/details/${scenarioId}` });
  }
}
