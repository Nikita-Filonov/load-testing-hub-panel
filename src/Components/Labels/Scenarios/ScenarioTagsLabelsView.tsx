import { FC } from 'react';
import { ScenarioTag } from '../../../Models/Services/Scenarios';
import { BaseLabelsView } from '../BaseLabelsView';
import { ScenarioTagLabel } from './ScenarioTagLabel';

type Props = {
  tags: ScenarioTag[];
};

export const ScenarioTagsLabelsView: FC<Props> = ({ tags }) => {
  return (
    <BaseLabelsView>
      {tags.map((tag, index) => (
        <ScenarioTagLabel key={index} tag={tag} />
      ))}
    </BaseLabelsView>
  );
};
