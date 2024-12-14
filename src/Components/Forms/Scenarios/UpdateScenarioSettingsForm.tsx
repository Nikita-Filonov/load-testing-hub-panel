import Box from '@mui/material/Box';
import { ScenarioSettings, UpdateScenarioSettingsRequest } from '../../../Models/Services/ScenarioSettings';
import { FC } from 'react';
import { BaseNumberTextField } from '../../TextFields/BaseNumberTextField';
import { MetricName } from '../../../Services/Constants/Metrics';

type UpdateScenarioSettingsFormProps = {
  request: UpdateScenarioSettingsRequest;
  setRequest: (request: UpdateScenarioSettingsRequest) => void;
};

export const UpdateScenarioSettingsForm: FC<UpdateScenarioSettingsFormProps> = (props) => {
  const { request, setRequest } = props;

  const onRequest = (key: keyof ScenarioSettings) => (value: number) => setRequest({ ...request, [key]: value });

  return (
    <Box>
      <BaseNumberTextField
        label={MetricName.ResponseTime}
        value={request.responseTime}
        onChange={onRequest('responseTime')}
      />
      <BaseNumberTextField
        label={MetricName.NumberOfUsers}
        value={request.numberOfUsers}
        onChange={onRequest('numberOfUsers')}
      />
      <BaseNumberTextField
        label={MetricName.MinResponseTime}
        value={request.minResponseTime}
        onChange={onRequest('minResponseTime')}
      />
      <BaseNumberTextField
        label={MetricName.MaxResponseTime}
        value={request.maxResponseTime}
        onChange={onRequest('maxResponseTime')}
      />
      <BaseNumberTextField
        label={MetricName.NumberOfRequests}
        value={request.numberOfRequests}
        onChange={onRequest('numberOfRequests')}
      />
      <BaseNumberTextField
        label={MetricName.NumberOfFailures}
        value={request.numberOfFailures}
        onChange={onRequest('numberOfFailures')}
      />
      <BaseNumberTextField
        label={MetricName.RequestsPerSecond}
        value={request.requestsPerSecond}
        onChange={onRequest('requestsPerSecond')}
      />
      <BaseNumberTextField
        label={MetricName.FailuresPerSecond}
        value={request.failuresPerSecond}
        onChange={onRequest('failuresPerSecond')}
      />
    </Box>
  );
};
