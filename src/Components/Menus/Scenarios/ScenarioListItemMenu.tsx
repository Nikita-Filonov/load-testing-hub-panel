import { FC, useState } from 'react';
import { BaseMenu } from '../BaseMenu';
import { BaseMenuItem } from '../BaseMenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Scenario } from '../../../Models/Services/Scenarios';

type ScenarioListItemMenuProps = {
  scenario: Scenario;
  onScenarioDetails: (scenario: Scenario) => void;
  onScenarioSettings: (scenario: Scenario) => void;
};

export const ScenarioListItemMenu: FC<ScenarioListItemMenuProps> = (props) => {
  const { scenario, onScenarioDetails, onScenarioSettings } = props;
  const [menu, setMenu] = useState<null | HTMLElement>(null);

  const onClose = () => setMenu(null);

  const onDetails = () => {
    onClose();
    onScenarioDetails(scenario);
  };

  const onSettings = () => {
    onClose();
    onScenarioSettings(scenario);
  };

  return (
    <BaseMenu menu={menu} setMenu={setMenu} icon={<MoreVertIcon />}>
      <BaseMenuItem icon={<ArticleOutlinedIcon />} label={'View details'} onClick={onDetails} />
      <BaseMenuItem icon={<SettingsOutlinedIcon />} label={'Settings'} onClick={onSettings} />
    </BaseMenu>
  );
};
