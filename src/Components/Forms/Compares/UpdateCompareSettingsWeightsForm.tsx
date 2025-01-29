import Box from '@mui/material/Box';
import { CompareSettingsWeights } from '../../../Models/Compares/CompareSettings';
import { FC } from 'react';
import { BaseInfoRowView } from '../../Views/BaseInfoRowView';
import { sumCompareSettingsWeights } from '../../../Services/Compares/Utils';
import { MetricsForm } from '../Metrics/MetricsForm';
import { ContentLengthForm } from '../Metrics/ContentLengthForm';
import { NumberOfUsersForm } from '../Metrics/NumberOfUsersForm';

type UpdateCompareSettingsWeightsFormProps = {
  weights: CompareSettingsWeights;
  setWeights: (weights: CompareSettingsWeights) => void;
};

export const UpdateCompareSettingsWeightsForm: FC<UpdateCompareSettingsWeightsFormProps> = (props) => {
  const { weights, setWeights } = props;

  return (
    <Box>
      <BaseInfoRowView name={'Sum of metrics'} value={`${sumCompareSettingsWeights(weights)} / 1`} />
      <MetricsForm data={weights} setData={setWeights} />
      <ContentLengthForm data={weights} setData={setWeights} />
      <NumberOfUsersForm data={weights} setData={setWeights} />
    </Box>
  );
};
