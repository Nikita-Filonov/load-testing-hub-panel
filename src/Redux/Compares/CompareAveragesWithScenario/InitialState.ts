import { LoadTestResultCompare } from '../../../Models/Compares/Compares';
import { getDefaultLoadTestResultCompare } from '../../../Services/Compares/Utils';

export type CompareAveragesWithScenarioInitialState = {
  compareAveragesWithScenario: LoadTestResultCompare;
};

export const INITIAL_COMPARE_AVERAGES_WITH_SCENARIO: CompareAveragesWithScenarioInitialState = {
  compareAveragesWithScenario: getDefaultLoadTestResultCompare()
};
