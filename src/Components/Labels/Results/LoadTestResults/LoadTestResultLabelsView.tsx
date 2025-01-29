import { BaseLabelsView } from '../../BaseLabelsView';
import { LoadTestResult } from '../../../../Models/Results/LoadTestResults';
import { FC } from 'react';
import { ScenarioTagLabel } from '../../Scenarios/ScenarioTagLabel';
import { BaseLabel } from '../../BaseLabel';
import { ResultCompareLabel } from '../ResultCompareLabel';

type LoadTestResultLabelsViewProps = {
  result: LoadTestResult;
};

export const LoadTestResultLabelsView: FC<LoadTestResultLabelsViewProps> = ({ result }) => {
  return (
    <BaseLabelsView listItemSx={(index) => ({ ml: index === 0 ? 0 : 0.5 })} containerSx={{ ml: 0 }}>
      {Boolean(result.triggerCIProjectVersion) && (
        <BaseLabel label={`Service: ${result.triggerCIProjectVersion}`} color={'info'} />
      )}
      {result.compare && <ResultCompareLabel compare={result.compare.compareWithAverage} context={'average'} />}
      {result.compare && <ResultCompareLabel compare={result.compare.compareWithPrevious} context={'previous'} />}
      <BaseLabel label={`Scenario: ${result.scenario.version}`} color={'info'} />
      {result.scenario.tags.map((tag, index) => (
        <ScenarioTagLabel key={index} tag={tag} />
      ))}
    </BaseLabelsView>
  );
};
