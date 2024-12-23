import Box from '@mui/material/Box';
import { BaseNumberTextField } from '../../TextFields/BaseNumberTextField';
import { CompareSettingsWeights } from '../../../Models/Compares/CompareSettings';
import { FC } from 'react';
import { BaseInfoRowView } from '../../Views/BaseInfoRowView';
import { sumCompareSettingsWeights } from '../../../Services/Compares/Utils';

type UpdateCompareSettingsWeightsFormProps = {
  weights: CompareSettingsWeights;
  setWeights: (request: CompareSettingsWeights) => void;
};

export const UpdateCompareSettingsWeightsForm: FC<UpdateCompareSettingsWeightsFormProps> = (props) => {
  const { weights, setWeights } = props;

  const onWeights = (key: keyof CompareSettingsWeights) => (value: number) => {
    setWeights({ ...weights, [key]: value });
  };

  return (
    <Box>
      <BaseInfoRowView name={'Sum of metrics'} value={`${sumCompareSettingsWeights(weights)} / 1`} />
      <BaseNumberTextField
        value={weights.responseTime}
        onChange={onWeights('responseTime')}
        label={'Response time weight'}
      />
      <BaseNumberTextField
        value={weights.minResponseTime}
        onChange={onWeights('minResponseTime')}
        label={'Min response time weight'}
      />
      <BaseNumberTextField
        value={weights.maxResponseTime}
        onChange={onWeights('maxResponseTime')}
        label={'Max response time weight'}
      />
      <BaseNumberTextField
        value={weights.numberOfRequests}
        onChange={onWeights('numberOfRequests')}
        label={'Number of requests weight'}
      />
      <BaseNumberTextField
        value={weights.numberOfFailures}
        onChange={onWeights('numberOfFailures')}
        label={'Number of failures weight'}
      />
      <BaseNumberTextField
        value={weights.requestsPerSecond}
        onChange={onWeights('requestsPerSecond')}
        label={'Requests per second weight'}
      />
      <BaseNumberTextField
        value={weights.failuresPerSecond}
        onChange={onWeights('failuresPerSecond')}
        label={'Failures per second weight'}
      />
    </Box>
  );
};
