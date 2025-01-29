import { ResponseTimes } from '../Metrics/ResponseTimes';
import { NumberOfRequests } from '../Metrics/NumberOfRequests';
import { RequestsPerSecond } from '../Metrics/RequestsPerSecond';
import { Percentiles } from '../Metrics/Percentiles';
import { ContentLength } from '../Metrics/ContentLength';

export interface ShortMethod {
  method: string;
}

export interface Method extends ShortMethod, ResponseTimes, NumberOfRequests, RequestsPerSecond {}

export interface MethodDetails extends Method, Percentiles, ContentLength {}

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
