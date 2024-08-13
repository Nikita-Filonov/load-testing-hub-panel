import { FC } from 'react';
import { BaseListItem } from '../BaseListItem';
import { Scenario } from '../../../Models/Services/Scenarios';
import ChecklistIcon from '@mui/icons-material/Checklist';

type ScenarioSettingsListItemProps = {
  selected: boolean;
  scenario: Scenario;
  onSelectScenario: (scenario: Scenario | null) => void;
};

export const ScenarioSettingsListItem: FC<ScenarioSettingsListItemProps> = (props) => {
  const { selected, scenario, onSelectScenario } = props;

  const onSelect = () => onSelectScenario(selected ? null : scenario);

  return (
    <BaseListItem
      icon={<ChecklistIcon fontSize={'small'} />}
      title={scenario.name}
      onClick={onSelect}
      selected={selected}
    />
  );
};
