import { BaseLabelsView } from '../../BaseLabelsView';
import { LoadTestResult } from '../../../../Models/Results/LoadTestResults';
import { FC } from 'react';
import { BaseLabelProps } from '../../BaseLabel';
import { getCompareColor, getCompareTitle } from '../../../../Services/Compare/Utils';
import { MAP_SCENARIO_TAG_TO_COLOR } from '../../Scenarios/ScenarioTagsLabel';

type LoadTestResultLabelsViewProps = {
  result: LoadTestResult;
};

export const LoadTestResultLabelsView: FC<LoadTestResultLabelsViewProps> = ({ result }) => {
  const labels: BaseLabelProps[] = [
    {
      label: getCompareTitle({ percent: result.compare?.compareWithAverage, context: 'average' }),
      color: getCompareColor(result.compare?.compareWithAverage)
    },
    {
      label: getCompareTitle({ percent: result.compare?.compareWithPrevious, context: 'previous' }),
      color: getCompareColor(result.compare?.compareWithPrevious)
    },
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
