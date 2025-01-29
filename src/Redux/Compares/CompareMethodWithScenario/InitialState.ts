import { MethodResultCompare } from '../../../Models/Compares/Compares';
import { getDefaultMethodResultCompare } from '../../../Services/Compares/Utils';

export type CompareMethodWithScenarioInitialState = {
  compareMethodWithScenario: MethodResultCompare;
};

export const INITIAL_COMPARE_METHOD_WITH_SCENARIO: CompareMethodWithScenarioInitialState = {
  compareMethodWithScenario: getDefaultMethodResultCompare()
};
