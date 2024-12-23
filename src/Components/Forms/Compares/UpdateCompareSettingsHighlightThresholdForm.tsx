import { BaseNumberTextField } from '../../TextFields/BaseNumberTextField';
import Box from '@mui/material/Box';
import { CompareSettingsHighlightThreshold } from '../../../Models/Compares/CompareSettings';
import { FC } from 'react';

type UpdateCompareSettingsHighlightThresholdFormProps = {
  highlightThreshold: CompareSettingsHighlightThreshold;
  setHighlightThreshold: (highlightThreshold: CompareSettingsHighlightThreshold) => void;
};

export const UpdateCompareSettingsHighlightThresholdForm: FC<UpdateCompareSettingsHighlightThresholdFormProps> = (
  props
) => {
  const { highlightThreshold, setHighlightThreshold } = props;

  const onHighlightThreshold = (key: keyof CompareSettingsHighlightThreshold) => (value: number) => {
    setHighlightThreshold({ ...highlightThreshold, [key]: value });
  };

  return (
    <Box>
      <BaseNumberTextField
        sx={{ mt: 0 }}
        value={highlightThreshold.compareWithAverage}
        onChange={onHighlightThreshold('compareWithAverage')}
        label={'Compare with average'}
      />
      <BaseNumberTextField
        value={highlightThreshold.compareWithPrevious}
        onChange={onHighlightThreshold('compareWithPrevious')}
        label={'Compare with previous'}
      />
      <BaseNumberTextField
        value={highlightThreshold.compareResultWithResults}
        onChange={onHighlightThreshold('compareResultWithResults')}
        label={'Compare result with results'}
      />
      <BaseNumberTextField
        value={highlightThreshold.compareResultWithAverages}
        onChange={onHighlightThreshold('compareResultWithAverages')}
        label={'Compare result with averages'}
      />
      <BaseNumberTextField
        value={highlightThreshold.compareResultWithScenario}
        onChange={onHighlightThreshold('compareResultWithScenario')}
        label={'Compare result with scenario'}
      />
      <BaseNumberTextField
        value={highlightThreshold.compareMethodWithScenario}
        onChange={onHighlightThreshold('compareMethodWithScenario')}
        label={'Compare method with scenario'}
      />
      <BaseNumberTextField
        value={highlightThreshold.compareAveragesWithScenario}
        onChange={onHighlightThreshold('compareAveragesWithScenario')}
        label={'Compare averages with scenario'}
      />
    </Box>
  );
};
