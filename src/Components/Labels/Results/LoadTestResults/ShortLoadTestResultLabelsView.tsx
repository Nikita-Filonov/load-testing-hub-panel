import { BaseLabelsView } from '../../BaseLabelsView';
import { ShortLoadTestResult } from '../../../../Models/Results/LoadTestResults';
import { FC } from 'react';
import { ScenarioTagLabel } from '../../Scenarios/ScenarioTagLabel';
import { BaseLabel } from '../../BaseLabel';

type ShortLoadTestResultLabelsViewProps = {
  result: ShortLoadTestResult;
};

export const ShortLoadTestResultLabelsView: FC<ShortLoadTestResultLabelsViewProps> = ({ result }) => {
  return (
    <BaseLabelsView listItemSx={(index) => ({ ml: index === 0 ? 0 : 0.5 })} containerSx={{ ml: 0 }}>
      {Boolean(result.triggerCIProjectVersion) && (
        <BaseLabel label={`Service: ${result.triggerCIProjectVersion}`} color={'info'} />
      )}
      <BaseLabel label={`Scenario: ${result.scenario.version}`} color={'info'} />
      {result.scenario.tags.map((tag, index) => (
        <ScenarioTagLabel key={index} tag={tag} />
      ))}
    </BaseLabelsView>
  );
};
