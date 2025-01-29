import Box from '@mui/material/Box';
import { ScenarioResultSettings } from '../../../Models/Services/ScenarioSettings';
import { FC } from 'react';
import { MetricsForm } from '../Metrics/MetricsForm';
import { NumberOfUsersForm } from '../Metrics/NumberOfUsersForm';

type UpdateScenarioResultSettingsFormProps = {
  settings: ScenarioResultSettings;
  setSettings: (settings: ScenarioResultSettings) => void;
};

export const UpdateScenarioResultSettingsForm: FC<UpdateScenarioResultSettingsFormProps> = (props) => {
  const { settings, setSettings } = props;

  return (
    <Box>
      <MetricsForm data={settings} setData={setSettings} />
      <NumberOfUsersForm data={settings} setData={setSettings} />
    </Box>
  );
};
