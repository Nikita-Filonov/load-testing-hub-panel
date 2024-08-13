import { HTTPClient } from '../HTTPClient';
import { Config } from '../../Config';

export class ConfigHTTPClient extends HTTPClient {
  async getConfig(): Promise<Config | null> {
    const response = await this.get({ url: '/config' });
    return response.error ? null : response.json;
  }
}
