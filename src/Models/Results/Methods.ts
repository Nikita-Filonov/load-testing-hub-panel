export interface ShortMethod {
  method: string;
}

export interface Method extends ShortMethod {
  averageResponseTime: number;
  averageNumberOfRequests: number;
  averageNumberOfFailures: number;
  averageRequestsPerSecond: number;
}

export interface MethodDetails extends Method {
  averageContentLength: number;
  averageMaxResponseTime: number;
  averageMinResponseTime: number;
  averageFailuresPerSecond: number;
}

export interface GetMethodsQuery {
  method?: string | null;
  serviceId: number;
  scenarioId: number | null;
  endDatetime: string;
  startDatetime: string;
}

export interface GetMethodsResponse {
  methods: Method[];
}

export interface GetMethodDetailsQuery {
  method: string;
  serviceId: number;
  scenarioId: number | null;
  endDatetime: string;
  startDatetime: string;
}

export interface GetMethodDetailsResponse {
  details: MethodDetails;
}

export interface GetShortMethodsQuery {
  serviceId: number;
  scenarioId: number | null;
}

export interface GetShortMethodsResponse {
  methods: ShortMethod[];
}
