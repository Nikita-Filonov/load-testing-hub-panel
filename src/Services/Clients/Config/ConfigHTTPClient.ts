import { HTTPClient } from '../HTTPClient';
import { Config } from '../../Config';
import { APIResponse } from '../Models';

export class ConfigHTTPClient extends HTTPClient {
  async getConfig(): Promise<APIResponse<Config>> {
    return await this.get({ url: '/config' });
  }
}
