import { FC } from 'react';
import { BaseListItem } from '../BaseListItem';
import WebhookIcon from '@mui/icons-material/Webhook';
import { ScenarioMethodSettings } from '../../../Models/Services/ScenarioSettings';
import { ScenarioMethodSettingsListItemMenu } from '../../Menus/Scenarios/ScenarioMethodSettingsListItemMenu';
import { getMethodLabel } from '../../../Services/Charts/Utils';

type ScenarioMethodSettingsListItemProps = {
  settings: ScenarioMethodSettings;
  onUpdateSettings: () => void;
  onDeleteSettings: () => void;
};

export const ScenarioMethodSettingsListItem: FC<ScenarioMethodSettingsListItemProps> = (props) => {
  const { settings, onUpdateSettings, onDeleteSettings } = props;

  return (
    <BaseListItem
      icon={<WebhookIcon fontSize={'small'} />}
      menu={
        <ScenarioMethodSettingsListItemMenu onUpdateSettings={onUpdateSettings} onDeleteSettings={onDeleteSettings} />
      }
      title={settings.method === '' ? 'unknown' : getMethodLabel(settings.method)}
      onClick={onUpdateSettings}
    />
  );
};
