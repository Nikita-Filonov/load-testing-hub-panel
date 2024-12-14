import { getQueryString } from './Utils';

interface HTTPClientProps {
  baseUrl?: string;
}

interface HTTPClientRequest extends RequestInit {
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query?: any;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query?: any;
}

export interface HTTPClientGetRequest {
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query?: any;
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

  async get(props: HTTPClientGetRequest): Promise<HTTPClientResponse> {
    return await this.makeRequest({ ...props, method: 'GET' });
  }

  async post(props: HTTPClientPOSTRequest): Promise<HTTPClientResponse> {
    return await this.makeRequest({ ...props, method: 'POST' });
  }

  async patch(props: HTTPClientPOSTRequest): Promise<HTTPClientResponse> {
    return await this.makeRequest({ ...props, method: 'PATCH' });
  }

  async delete(props: HTTPClientPOSTRequest): Promise<HTTPClientResponse> {
    return await this.makeRequest({ ...props, method: 'DELETE' });
  }
}
