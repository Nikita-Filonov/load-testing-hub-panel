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

export class ScenariosHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getScenario(scenarioId: number): Promise<GetScenarioResponse | null> {
    const response = await this.get({ url: `/scenarios/${scenarioId}` });
    return response.json;
  }

  async getScenarios(query: GetScenariosQuery): Promise<GetScenariosResponse | null> {
    const response = await this.get({ url: '/scenarios', query });
    return response.json;
  }

  async createScenario(request: CreateScenarioRequest): Promise<GetScenarioDetailsResponse | null> {
    const response = await this.post({ url: '/scenarios', body: request });
    return response.json;
  }

  async updateScenario(scenarioId: number, request: UpdateScenarioRequest): Promise<GetScenarioDetailsResponse | null> {
    const response = await this.patch({ url: `/scenarios/${scenarioId}`, body: request });
    return response.json;
  }

  async deleteScenario(scenarioId: number) {
    const response = await this.delete({ url: `/scenarios/${scenarioId}` });
    return response.error;
  }

  async getScenarioDetails(scenarioId: number): Promise<GetScenarioDetailsResponse | null> {
    const response = await this.get({ url: `/scenarios/details/${scenarioId}` });
    return response.json;
  }
}
