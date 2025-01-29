import { BaseLabel, LabelColor } from '../BaseLabel';
import { ScenarioTag } from '../../../Models/Services/Scenarios';
import { FC } from 'react';

const MAP_SCENARIO_TAG_TO_COLOR: Record<ScenarioTag, LabelColor> = {
  [ScenarioTag.Latest]: 'success',
  [ScenarioTag.Legacy]: 'warning',
  [ScenarioTag.Experiment]: 'secondary'
};

type ScenarioTagLabelProps = {
  tag: ScenarioTag;
};

export const ScenarioTagLabel: FC<ScenarioTagLabelProps> = ({ tag }) => {
  return <BaseLabel label={tag} color={MAP_SCENARIO_TAG_TO_COLOR[tag]} />;
};
