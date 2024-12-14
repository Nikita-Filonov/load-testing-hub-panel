import { LoadTestResultCompare, MethodResultCompare } from './Compares';
import { ShortLoadTestResult } from '../Results/LoadTestResults';

export interface CompareResultWithResultsAverageSummary {
  methodResultCompares: MethodResultCompare[];
  loadTestResultCompare: LoadTestResultCompare;
}

export interface CompareResultWithResults {
  methodResultCompares: MethodResultCompare[];
  loadTestResultCompare: LoadTestResultCompare;
  compareWithLoadTestResult: ShortLoadTestResult;
}

export interface GetCompareResultWithResultsQuery extends Record<string, number | number[]> {
  loadTestResultId: number;
  compareWithLoadTestResults: number[];
}

export interface GetCompareResultWithResultsResponse {
  summary: CompareResultWithResultsAverageSummary;
  compares: CompareResultWithResults[];
}
