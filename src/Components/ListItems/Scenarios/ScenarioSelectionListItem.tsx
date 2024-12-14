import { FC } from 'react';
import { BaseListItem } from '../BaseListItem';
import { Scenario } from '../../../Models/Services/Scenarios';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { ScenarioTagsLabel } from '../../Labels/Scenarios/ScenarioTagsLabel';
import { getScenarioTitle } from '../../../Services/Scenarios/Utils';

type ScenarioSelectionListItemProps = {
  selected: boolean;
  scenario: Scenario;
  onSelectScenario: (scenario: Scenario | null) => void;
};

export const ScenarioSelectionListItem: FC<ScenarioSelectionListItemProps> = (props) => {
  const { selected, scenario, onSelectScenario } = props;

  const onSelect = () => onSelectScenario(selected ? null : scenario);

  return (
    <BaseListItem
      icon={<ChecklistIcon fontSize={'small'} />}
      title={getScenarioTitle(scenario)}
      label={<ScenarioTagsLabel tags={scenario.tags} />}
      onClick={onSelect}
      subtitle={scenario.version}
      selected={selected}
    />
  );
};
