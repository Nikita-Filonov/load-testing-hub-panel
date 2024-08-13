import Box from '@mui/material/Box';
import { ScenarioSettings } from '../../../Models/Services/ScenarioSettings';
import { FC } from 'react';
import { BaseNumberTextField } from '../../TextFields/BaseNumberTextField';

type UpdateScenarioSettingsFormProps = {
  settings: ScenarioSettings;
  setSettings: (settings: ScenarioSettings) => void;
};

export const UpdateScenarioSettingsForm: FC<UpdateScenarioSettingsFormProps> = (props) => {
  const { settings, setSettings } = props;

  const onRequestsPerSecond = (requestsPerSecond: number) => setSettings({ ...settings, requestsPerSecond });

  return (
    <Box>
      <BaseNumberTextField
        label={'Requests per second'}
        value={settings.requestsPerSecond}
        onChange={onRequestsPerSecond}
      />
    </Box>
  );
};
