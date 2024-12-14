import { BaseLabelsView } from '../../BaseLabelsView';
import { ShortLoadTestResult } from '../../../../Models/Results/LoadTestResults';
import { FC } from 'react';
import { BaseLabelProps } from '../../BaseLabel';
import { MAP_SCENARIO_TAG_TO_COLOR } from '../../Scenarios/ScenarioTagsLabel';

type ShortLoadTestResultLabelsViewProps = {
  result: ShortLoadTestResult;
};

export const ShortLoadTestResultLabelsView: FC<ShortLoadTestResultLabelsViewProps> = ({ result }) => {
  const labels: BaseLabelProps[] = [
    { label: `Scenario: ${result.scenario.version}`, color: 'info' },
    ...result.scenario.tags.map((tag) => ({ label: tag, color: MAP_SCENARIO_TAG_TO_COLOR[tag] }))
  ];

  if (result.triggerCIProjectVersion) {
    labels.unshift({ label: `Service: ${result.triggerCIProjectVersion}`, color: 'info' });
  }

  return (
    <BaseLabelsView
      labels={labels.map((label, index) => ({ ...label, sx: { ml: index === 0 ? 0 : 0.5 } }))}
      listItemSx={{ ml: 0 }}
      containerSx={{ ml: 0 }}
    />
  );
};
