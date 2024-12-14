export interface ExceptionResult {
  id: number;
  message: string;
  numberOfExceptions: number;
}

export interface ExceptionResultDetails extends ExceptionResult {
  details: string;
}

export interface GetExceptionResultsQuery extends Record<string, number> {
  loadTestResultId: number;
}

export interface GetExceptionResultsResponse {
  results: ExceptionResult[];
}

export interface GetExceptionResultDetailsResponse {
  details: ExceptionResultDetails;
}
