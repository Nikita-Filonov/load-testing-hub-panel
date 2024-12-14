import { LoadTestResultCompare, MethodResultCompare } from './Compares';

export interface CompareResultWithAverages {
  methodResultCompares: MethodResultCompare[];
  loadTestResultCompare: LoadTestResultCompare;
}

export interface GetCompareResultWithAveragesQuery extends Record<string, number | string | null> {
  scenarioId: number | null;
  endDatetime: string;
  startDatetime: string;
  loadTestResultId: number;
}

export interface GetCompareResultWithAveragesResponse {
  compare: CompareResultWithAverages;
}
