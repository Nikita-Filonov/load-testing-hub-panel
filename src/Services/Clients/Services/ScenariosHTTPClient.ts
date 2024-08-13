import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import {
  GetScenarioDetailsResponse,
  GetScenarioResponse,
  GetScenariosQuery,
  GetScenariosResponse
} from '../../../Models/Services/Scenarios';

export class ScenariosHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getScenario(name: string): Promise<GetScenarioResponse | null> {
    const response = await this.get({ url: `/scenarios/${name}` });
    return response.json;
  }

  async getScenarios(query: GetScenariosQuery): Promise<GetScenariosResponse | null> {
    const response = await this.get({ url: '/scenarios', query });
    return response.json;
  }

  async getScenarioDetails(name: string): Promise<GetScenarioDetailsResponse | null> {
    const response = await this.get({ url: `/scenarios/details/${name}` });
    return response.json;
  }
}
