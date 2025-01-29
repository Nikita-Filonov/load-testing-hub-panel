import { FC } from 'react';
import { BaseListItem } from '../BaseListItem';
import { Scenario } from '../../../Models/Services/Scenarios';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { ScenarioListItemMenu } from '../../Menus/Scenarios/ScenarioListItemMenu';
import { ScenarioTagsLabelsView } from '../../Labels/Scenarios/ScenarioTagsLabelsView';
import { getScenarioTitle } from '../../../Services/Scenarios/Utils';

type ScenarioListItemProps = {
  scenario: Scenario;
  onUpdateScenario: (scenario: Scenario) => void;
  onScenarioDetails: (scenario: Scenario) => void;
  onScenarioSettings: (scenario: Scenario) => void;
};

export const ScenarioListItem: FC<ScenarioListItemProps> = (props) => {
  const { scenario, onUpdateScenario, onScenarioDetails, onScenarioSettings } = props;

  const onDetails = () => onScenarioDetails(scenario);

  return (
    <BaseListItem
      icon={<ChecklistIcon fontSize={'small'} />}
      menu={
        <ScenarioListItemMenu
          scenario={scenario}
          onUpdateScenario={onUpdateScenario}
          onScenarioDetails={onScenarioDetails}
          onScenarioSettings={onScenarioSettings}
        />
      }
      label={<ScenarioTagsLabelsView tags={scenario.tags} />}
      title={getScenarioTitle(scenario)}
      subtitle={scenario.version}
      onClick={onDetails}
    />
  );
};
