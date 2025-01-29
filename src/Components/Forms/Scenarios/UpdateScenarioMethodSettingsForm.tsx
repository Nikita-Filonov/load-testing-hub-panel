import Box from '@mui/material/Box';
import { ScenarioMethodSettings } from '../../../Models/Services/ScenarioSettings';
import { FC } from 'react';
import { ShortMethodSelect } from '../../Selects/Methods/ShortMethodSelect';
import { ShortMethod } from '../../../Models/Methods/Methods';
import { MetricsForm } from '../Metrics/MetricsForm';
import { ContentLengthForm } from '../Metrics/ContentLengthForm';

type UpdateScenarioMethodSettingsFormProps = {
  methods: ShortMethod[];
  settings: ScenarioMethodSettings;
  setSettings: (settings: ScenarioMethodSettings) => void;
};

export const UpdateScenarioMethodSettingsForm: FC<UpdateScenarioMethodSettingsFormProps> = (props) => {
  const { methods, settings, setSettings } = props;

  const onMethod = (method: string) => setSettings({ ...settings, method });

  return (
    <Box>
      <ShortMethodSelect method={settings.method} methods={methods} onSelectMethod={onMethod} />
      <MetricsForm data={settings} setData={setSettings} />
      <ContentLengthForm data={settings} setData={setSettings} />
    </Box>
  );
};
