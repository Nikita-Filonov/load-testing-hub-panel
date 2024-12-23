import { BaseLabelsView } from '../../BaseLabelsView';
import { LoadTestResult, LoadTestResultCompare } from '../../../../Models/Results/LoadTestResults';
import { FC } from 'react';
import { BaseLabelProps } from '../../BaseLabel';
import { getCompareColor, getCompareTitle } from '../../../../Services/Compare/Utils';
import { MAP_SCENARIO_TAG_TO_COLOR } from '../../Scenarios/ScenarioTagsLabel';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

type LoadTestResultLabelsViewProps = {
  result: LoadTestResult;
};

const getLoadTestResultCompareLabelProps = (props: {
  compare?: LoadTestResultCompare;
  context: string;
}): BaseLabelProps => {
  const { compare, context } = props;

  return {
    icon: compare?.highlight ? <ErrorOutlineIcon fontSize={'small'} /> : undefined,
    label: getCompareTitle({ percent: compare?.compare, context }),
    color: compare?.highlight ? 'error' : getCompareColor(compare?.compare)
  };
};

export const LoadTestResultLabelsView: FC<LoadTestResultLabelsViewProps> = ({ result }) => {
  const labels: BaseLabelProps[] = [
    getLoadTestResultCompareLabelProps({ compare: result.compare?.compareWithAverage, context: 'average' }),
    getLoadTestResultCompareLabelProps({ compare: result.compare?.compareWithPrevious, context: 'previous' }),
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
