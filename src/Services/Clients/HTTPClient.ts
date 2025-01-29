import { getQueryString } from './Utils';
import {
  APIResponse,
  HTTPClientGetRequest,
  HTTPClientPOSTRequest,
  HTTPClientRequest,
  HTTPClientResponse
} from './Models';

interface HTTPClientProps {
  baseUrl?: string;
}

export class HTTPClient {
  public baseUrl?: string;

  constructor({ baseUrl }: HTTPClientProps = { baseUrl: '' }) {
    this.baseUrl = baseUrl;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getUrl(url: string, query?: any): string {
    return `${this.baseUrl}${url}${getQueryString(query)}`;
  }

  private async makeRequest(props: HTTPClientRequest): Promise<HTTPClientResponse> {
    const { url, query, body, ...other } = props;

    const config: RequestInit = {
      body: body ? JSON.stringify(body) : undefined,
      headers: { 'Content-Type': 'application/json' },
      ...other
    };

    try {
      const response = await fetch(this.getUrl(url, query), config);
      const json = await response.json().catch(() => null);

      return { json, error: !response.ok, status: response.status };
    } catch {
      return { json: null, error: true, status: 500 };
    }
  }

  private handleResponse = <Response>(response: HTTPClientResponse): APIResponse<Response> => {
    switch (response.status) {
      case 200:
        return { error: response.error, response: response.json, validationErrors: null };
      case 422:
        return { error: response.error, response: null, validationErrors: response.json?.detail || [] };
      default:
        return { error: response.error, response: null, validationErrors: null };
    }
  };

  async get<Response>(props: HTTPClientGetRequest): Promise<APIResponse<Response>> {
    return this.handleResponse(await this.makeRequest({ ...props, method: 'GET' }));
  }

  async post<Response>(props: HTTPClientPOSTRequest): Promise<APIResponse<Response>> {
    return this.handleResponse(await this.makeRequest({ ...props, method: 'POST' }));
  }

  async patch<Response>(props: HTTPClientPOSTRequest): Promise<APIResponse<Response>> {
    return this.handleResponse(await this.makeRequest({ ...props, method: 'PATCH' }));
  }

  async delete<Response>(props: HTTPClientPOSTRequest): Promise<APIResponse<Response>> {
    return this.handleResponse(await this.makeRequest({ ...props, method: 'DELETE' }));
  }
}
