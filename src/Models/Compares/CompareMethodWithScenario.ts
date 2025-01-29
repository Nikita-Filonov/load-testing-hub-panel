import { MethodResultCompare } from './Compares';
import { GetMethodDetailsQuery } from '../Methods/Methods';

export interface GetCompareMethodWithScenarioQuery extends GetMethodDetailsQuery {
  scenarioId: number;
}

export interface GetCompareMethodWithScenarioResponse {
  compare: MethodResultCompare;
}
