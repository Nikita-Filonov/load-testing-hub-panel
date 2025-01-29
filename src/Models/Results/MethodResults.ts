import { Metrics } from '../Metrics/Base';
import { ContentLength } from '../Metrics/ContentLength';
import { ResultCompare } from './ResultCompare';

export interface MethodResultSummaryCompare {
  compareWithAverage: ResultCompare;
  compareWithPrevious: ResultCompare;
}

export interface MethodResult extends Metrics, ContentLength {
  id: number;
  method: string;
  protocol: string;
}

export interface MethodResultDetails extends MethodResult {
  compare: MethodResultSummaryCompare | null;
}

export interface GetMethodResultsQuery extends Record<string, number> {
  loadTestResultId: number;
}

export interface GetMethodResultDetailsQuery {
  scenarioId: number | null;
}

export interface GetMethodResultsResponse {
  results: MethodResult[];
}

export interface GetMethodResultDetailsResponse {
  details: MethodResultDetails;
}
