import { CompareResultWithScenario } from '../../../Models/Compares/CompareResultWithScenario';
import { INITIAL_SCENARIOS } from '../../Services/Scenarios/InitialState';
import { getDefaultLoadTestResultCompare } from '../../../Services/Compares/Utils';

export type CompareResultWithScenarioInitialState = {
  compareResultWithScenario: CompareResultWithScenario;
};

export const INITIAL_COMPARE_RESULT_WITH_SCENARIO: CompareResultWithScenarioInitialState = {
  compareResultWithScenario: {
    scenario: INITIAL_SCENARIOS.scenario,
    methodResultCompares: [],
    loadTestResultCompare: getDefaultLoadTestResultCompare()
  }
};
