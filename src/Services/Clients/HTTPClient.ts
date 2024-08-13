import { getQuery, Query } from './Utils';

interface HTTPClientProps {
  baseUrl?: string;
}

interface HTTPClientRequest extends RequestInit {
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
  query?: Query;
  method: 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE';
}

interface HTTPClientResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  json: any | null;
  error: boolean;
  status: number;
}

export interface HTTPClientPOSTRequest {
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: BodyInit | null | undefined | Record<string, any>;
}

export interface HTTPClientGetRequest {
  url: string;
  query?: Query;
}

export class HTTPClient {
  public baseUrl?: string;

  constructor({ baseUrl }: HTTPClientProps = { baseUrl: '' }) {
    this.baseUrl = baseUrl;
  }

  private async getUrl(url: string, query?: Query): Promise<string> {
    let queryString = '';

    if (query) {
      queryString = await getQuery(query);
    }

    return `${this.baseUrl}${url}${queryString}`;
  }

  private async makeRequest(props: HTTPClientRequest): Promise<HTTPClientResponse> {
    const { url, query, ...other } = props;

    const config: RequestInit = {
      headers: { 'Content-Type': 'application/json' },
      ...other
    };

    if (config.body) {
      config.body = JSON.stringify(config.body);
    }

    const requestUrl = await this.getUrl(url, query);
    const response = await fetch(requestUrl, config);
    const httpClientResponse: HTTPClientResponse = {
      json: null,
      error: !response.ok,
      status: response.status
    };

    try {
      httpClientResponse.json = await response.json();
    } catch {
      httpClientResponse.json = null;
    }

    return httpClientResponse;
  }

  async get(props: HTTPClientGetRequest): Promise<HTTPClientResponse> {
    const { url, query } = props;

    return await this.makeRequest({ url, query, method: 'GET' });
  }

  async put(props: HTTPClientPOSTRequest): Promise<HTTPClientResponse> {
    const { url, body } = props;

    return await this.makeRequest({ url, body, method: 'PUT' });
  }

  async post(props: HTTPClientPOSTRequest): Promise<HTTPClientResponse> {
    const { url, body } = props;

    return await this.makeRequest({ url, body, method: 'POST' });
  }

  async patch(props: HTTPClientPOSTRequest): Promise<HTTPClientResponse> {
    const { url, body } = props;

    return await this.makeRequest({ url, body, method: 'PATCH' });
  }

  async delete(props: HTTPClientPOSTRequest): Promise<HTTPClientResponse> {
    const { url, body } = props;

    return await this.makeRequest({ url, body, method: 'DELETE' });
  }
}
