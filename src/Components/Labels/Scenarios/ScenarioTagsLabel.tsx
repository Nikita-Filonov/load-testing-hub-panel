import { FC } from 'react';
import { ScenarioTag } from '../../../Models/Services/Scenarios';
import { BaseLabelsView } from '../BaseLabelsView';
import { LabelColor } from '../BaseLabel';

type ScenarioTagsLabelProps = {
  tags: ScenarioTag[];
};

export const MAP_SCENARIO_TAG_TO_COLOR: Record<ScenarioTag, LabelColor> = {
  [ScenarioTag.Latest]: 'success',
  [ScenarioTag.Legacy]: 'warning',
  [ScenarioTag.Experiment]: 'secondary'
};

export const ScenarioTagsLabel: FC<ScenarioTagsLabelProps> = ({ tags }) => {
  return (
    <BaseLabelsView
      labels={tags.map((tag) => ({
        label: tag,
        color: MAP_SCENARIO_TAG_TO_COLOR[tag]
      }))}
    />
  );
};
