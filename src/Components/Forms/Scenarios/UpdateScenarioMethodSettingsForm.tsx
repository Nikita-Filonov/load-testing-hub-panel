import Box from '@mui/material/Box';
import { ScenarioMethodSettings } from '../../../Models/Services/ScenarioSettings';
import { FC } from 'react';
import { BaseNumberTextField } from '../../TextFields/BaseNumberTextField';
import { Button, Divider } from '@mui/material';
import { ShortMethodSelect } from '../../Selects/Results/Methods/ShortMethodSelect';
import { ShortMethod } from '../../../Models/Results/Methods';

type UpdateScenarioMethodSettingsFormProps = {
  methods: ShortMethod[];
  settings: ScenarioMethodSettings;
  setSettings: (settings: ScenarioMethodSettings) => void;
  onDeleteSettings: () => void;
};

export const UpdateScenarioMethodSettingsForm: FC<UpdateScenarioMethodSettingsFormProps> = (props) => {
  const { methods, settings, setSettings, onDeleteSettings } = props;

  const onMethod = (method: string) => setSettings({ ...settings, method });

  const onRequestsPerSecond = (requestsPerSecond: number) => setSettings({ ...settings, requestsPerSecond });

  return (
    <Box>
      <ShortMethodSelect method={settings.method} methods={methods} onSelectMethod={onMethod} />
      <BaseNumberTextField
        label={'Requests per second'}
        value={settings.requestsPerSecond}
        onChange={onRequestsPerSecond}
      />
      <Button sx={{ mt: 2 }} size={'small'} variant={'outlined'} color={'error'} onClick={onDeleteSettings}>
        Delete
      </Button>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};
