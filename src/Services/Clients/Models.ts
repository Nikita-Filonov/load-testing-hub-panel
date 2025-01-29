export interface HTTPClientRequest extends RequestInit {
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query?: any;
  method: 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE';
}

export interface HTTPClientResponse {
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

export interface ValidationError {
  msg: string;
  loc: string[];
}

export interface APIResponse<Response = unknown> {
  error: boolean;
  response: Response | null;
  validationErrors: ValidationError[] | null;
}
