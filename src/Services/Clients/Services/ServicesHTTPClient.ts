import { HTTPClient } from '../HTTPClient';
import { SettingsManager } from '../../Config';
import {
  CreateServiceRequest,
  GetServiceDetailsResponse,
  GetServiceResponse,
  GetServicesResponse,
  UpdateServiceRequest
} from '../../../Models/Services/Services';

export class ServicesHTTPClient extends HTTPClient {
  constructor() {
    super({ baseUrl: SettingsManager.apiUrl });
  }

  async getService(serviceId: number): Promise<GetServiceResponse | null> {
    const response = await this.get({ url: `/services/${serviceId}` });
    return response.json;
  }

  async getServices(): Promise<GetServicesResponse | null> {
    const response = await this.get({ url: '/services' });
    return response.json;
  }

  async createService(request: CreateServiceRequest): Promise<GetServiceDetailsResponse | null> {
    const response = await this.post({ url: '/services', body: request });
    return response.json;
  }

  async updateService(serviceId: number, request: UpdateServiceRequest): Promise<GetServiceDetailsResponse | null> {
    const response = await this.patch({ url: `/services/${serviceId}`, body: request });
    return response.json;
  }

  async deleteService(serviceId: number) {
    const response = await this.delete({ url: `/services/${serviceId}` });
    return response.error;
  }

  async getServiceDetails(serviceId: number): Promise<GetServiceDetailsResponse | null> {
    const response = await this.get({ url: `/services/details/${serviceId}` });
    return response.json;
  }
}
