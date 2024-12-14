import Box from '@mui/material/Box';
import { ScenarioMethodSettings } from '../../../Models/Services/ScenarioSettings';
import { FC } from 'react';
import { BaseNumberTextField } from '../../TextFields/BaseNumberTextField';
import { ShortMethodSelect } from '../../Selects/Methods/ShortMethodSelect';
import { ShortMethod } from '../../../Models/Results/Methods';
import { MetricName } from '../../../Services/Constants/Metrics';

type UpdateScenarioMethodSettingsFormProps = {
  methods: ShortMethod[];
  settings: ScenarioMethodSettings;
  setSettings: (settings: ScenarioMethodSettings) => void;
};

export const UpdateScenarioMethodSettingsForm: FC<UpdateScenarioMethodSettingsFormProps> = (props) => {
  const { methods, settings, setSettings } = props;

  const onMethod = (method: string) => setSettings({ ...settings, method });

  const onSettings = (key: keyof ScenarioMethodSettings) => (value: number) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <Box>
      <ShortMethodSelect method={settings.method} methods={methods} onSelectMethod={onMethod} />
      <BaseNumberTextField
        label={MetricName.ResponseTime}
        value={settings.responseTime}
        onChange={onSettings('responseTime')}
      />
      <BaseNumberTextField
        label={MetricName.ContentLength}
        value={settings.contentLength}
        onChange={onSettings('contentLength')}
      />
      <BaseNumberTextField
        label={MetricName.MinResponseTime}
        value={settings.minResponseTime}
        onChange={onSettings('minResponseTime')}
      />
      <BaseNumberTextField
        label={MetricName.MaxResponseTime}
        value={settings.maxResponseTime}
        onChange={onSettings('maxResponseTime')}
      />
      <BaseNumberTextField
        label={MetricName.NumberOfRequests}
        value={settings.numberOfRequests}
        onChange={onSettings('numberOfRequests')}
      />
      <BaseNumberTextField
        label={MetricName.NumberOfFailures}
        value={settings.numberOfFailures}
        onChange={onSettings('numberOfFailures')}
      />
      <BaseNumberTextField
        label={MetricName.RequestsPerSecond}
        value={settings.requestsPerSecond}
        onChange={onSettings('requestsPerSecond')}
      />
      <BaseNumberTextField
        label={MetricName.FailuresPerSecond}
        value={settings.failuresPerSecond}
        onChange={onSettings('failuresPerSecond')}
      />
    </Box>
  );
};
