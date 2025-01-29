import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import {
  CreateServiceRequest,
  GetServiceDetailsResponse,
  GetServiceResponse,
  GetServicesResponse,
  UpdateServiceRequest
} from '../../../Models/Services/Services';
import { APIResponse } from '../Models';

export class ServicesHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getService(serviceId: number): Promise<APIResponse<GetServiceResponse>> {
    return await this.get({ url: `/services/${serviceId}` });
  }

  async getServices(): Promise<APIResponse<GetServicesResponse>> {
    return await this.get({ url: '/services' });
  }

  async createService(request: CreateServiceRequest): Promise<APIResponse<GetServiceDetailsResponse>> {
    return await this.post({ url: '/services', body: request });
  }

  async updateService(
    serviceId: number,
    request: UpdateServiceRequest
  ): Promise<APIResponse<GetServiceDetailsResponse>> {
    return await this.patch({ url: `/services/${serviceId}`, body: request });
  }

  async deleteService(serviceId: number) {
    return await this.delete({ url: `/services/${serviceId}` });
  }

  async getServiceDetails(serviceId: number): Promise<APIResponse<GetServiceDetailsResponse>> {
    return await this.get({ url: `/services/details/${serviceId}` });
  }
}
