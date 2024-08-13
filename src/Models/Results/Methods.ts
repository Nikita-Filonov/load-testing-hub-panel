export interface ShortMethod {
  method: string;
  service: string;
}

export interface Method extends ShortMethod {
  averageResponseTime: number;
  averageNumberOfRequests: number;
  averageNumberOfFailures: number;
  averageRequestsPerSecond: number;
}

export interface MethodDetails extends Method {
  averageMaxResponseTime: number;
  averageMinResponseTime: number;
  averageFailuresPerSecond: number;
}

export interface MethodScenarioCompare {
  scenarioRequestsPerSecond: number;
  averageRequestsPerSecond: number;
  averageRequestsPerSecondCompare: number;
}

export interface GetMethodsQuery extends Record<string, string | null | undefined> {
  method?: string | null;
  service: string;
  scenario: string | null;
  endDatetime: string;
  startDatetime: string;
}

export interface GetMethodsResponse {
  methods: Method[];
}

export interface GetMethodDetailsQuery extends Record<string, string | null | undefined> {
  method: string;
  scenario: string | null;
  endDatetime: string;
  startDatetime: string;
}

export interface GetMethodDetailsResponse {
  details: MethodDetails;
}

export interface GetShortMethodsQuery extends Record<string, string | null> {
  service: string;
  scenario: string | null;
}

export interface GetShortMethodsResponse {
  methods: ShortMethod[];
}

export interface GetMethodScenarioCompareQuery extends GetMethodDetailsQuery {
  scenario: string;
}

export interface GetMethodScenarioCompareResponse {
  compare: MethodScenarioCompare;
}
