import { FC } from 'react';
import { BaseListItem } from '../BaseListItem';
import { Scenario } from '../../../Models/Services/Scenarios';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { ScenarioListItemMenu } from '../../Menus/Scenarios/ScenarioListItemMenu';

type ScenarioListItemProps = {
  selected: boolean;
  scenario: Scenario;
  onScenarioDetails: (scenario: Scenario) => void;
  onScenarioSettings: (scenario: Scenario) => void;
};

export const ScenarioListItem: FC<ScenarioListItemProps> = (props) => {
  const { selected, scenario, onScenarioDetails, onScenarioSettings } = props;

  const onDetails = () => onScenarioDetails(scenario);

  return (
    <BaseListItem
      icon={<ChecklistIcon fontSize={'small'} />}
      menu={
        <ScenarioListItemMenu
          scenario={scenario}
          onScenarioDetails={onScenarioDetails}
          onScenarioSettings={onScenarioSettings}
        />
      }
      title={scenario.name}
      onClick={onDetails}
      selected={selected}
    />
  );
};
