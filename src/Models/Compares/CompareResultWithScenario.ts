import { LoadTestResultCompare, MethodResultCompare } from './Compares';
import { Scenario } from '../Services/Scenarios';

export interface CompareResultWithScenario {
  scenario: Scenario;
  methodResultCompares: MethodResultCompare[];
  loadTestResultCompare: LoadTestResultCompare;
}

export interface GetCompareResultWithScenarioQuery extends Record<string, number> {
  loadTestResultId: number;
}

export interface GetCompareResultWithScenarioResponse {
  compare: CompareResultWithScenario;
}
