import Box from '@mui/material/Box';
import { BaseNumberTextField } from '../../TextFields/BaseNumberTextField';
import { CompareSettings, UpdateCompareSettingsRequest } from '../../../Models/Compares/CompareSettings';
import { FC } from 'react';
import { BaseInfoRowView } from '../../Views/BaseInfoRowView';
import { sumCompareSettingsMetrics } from '../../../Services/Compares/Utils';

type UpdateCompareSettingsFormProps = {
  request: UpdateCompareSettingsRequest;
  setRequest: (request: UpdateCompareSettingsRequest) => void;
};

export const UpdateCompareSettingsForm: FC<UpdateCompareSettingsFormProps> = (props) => {
  const { request, setRequest } = props;

  const onRequest = (key: keyof CompareSettings) => (value: number) => {
    setRequest({ ...request, [key]: value });
  };

  return (
    <Box>
      <BaseInfoRowView name={'Sum of metrics'} value={`${sumCompareSettingsMetrics(request)} / 1`} />
      <BaseNumberTextField
        value={request.responseTimeWeight}
        onChange={onRequest('responseTimeWeight')}
        label={'Response time weight'}
      />
      <BaseNumberTextField
        value={request.minResponseTimeWeight}
        onChange={onRequest('minResponseTimeWeight')}
        label={'Min response time weight'}
      />
      <BaseNumberTextField
        value={request.maxResponseTimeWeight}
        onChange={onRequest('maxResponseTimeWeight')}
        label={'Max response time weight'}
      />
      <BaseNumberTextField
        value={request.numberOfRequestsWeight}
        onChange={onRequest('numberOfRequestsWeight')}
        label={'Number of requests weight'}
      />
      <BaseNumberTextField
        value={request.numberOfFailuresWeight}
        onChange={onRequest('numberOfFailuresWeight')}
        label={'Number of failures weight'}
      />
      <BaseNumberTextField
        value={request.requestsPerSecondWeight}
        onChange={onRequest('requestsPerSecondWeight')}
        label={'Requests per second weight'}
      />
      <BaseNumberTextField
        value={request.failuresPerSecondWeight}
        onChange={onRequest('failuresPerSecondWeight')}
        label={'Failures per second weight'}
      />
    </Box>
  );
};
