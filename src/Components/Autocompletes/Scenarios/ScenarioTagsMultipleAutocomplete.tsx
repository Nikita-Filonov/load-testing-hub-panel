import { BaseMultipleAutocomplete } from '../BaseMultipleAutocomplete';
import { FC } from 'react';
import { ScenarioTag } from '../../../Models/Services/Scenarios';

type ScenarioTagsMultipleAutocompleteProps = {
  tags: ScenarioTag[];
  setTags: (tags: ScenarioTag[]) => void;
};

export const ScenarioTagsMultipleAutocomplete: FC<ScenarioTagsMultipleAutocompleteProps> = (props) => {
  const { tags, setTags } = props;

  return (
    <BaseMultipleAutocomplete
      value={tags}
      options={[ScenarioTag.Latest, ScenarioTag.Legacy, ScenarioTag.Experiment]}
      label={'Tags'}
      getOptionLabel={(option: ScenarioTag) => option}
      onChange={setTags}
    />
  );
};
