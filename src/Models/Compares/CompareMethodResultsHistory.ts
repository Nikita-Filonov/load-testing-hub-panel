export interface GetCompareMethodResultsHistoryQuery {
  method: string;
  loadTestResultId: number;
  compareWithLoadTestResults: number[];
}
