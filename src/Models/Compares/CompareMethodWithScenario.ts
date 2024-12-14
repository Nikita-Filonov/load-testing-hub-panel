import { MethodResultCompare } from './Compares';
import { GetMethodDetailsQuery } from '../Results/Methods';

export interface GetCompareMethodWithScenarioQuery extends GetMethodDetailsQuery {
  scenarioId: number;
}

export interface GetCompareMethodWithScenarioResponse {
  compare: MethodResultCompare;
}
