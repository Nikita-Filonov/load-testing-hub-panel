import { getLoadTestResultCompareColor } from '../../../Services/Results/Utils';
import { BaseGaugeChart } from '../../../Components/Charts/BaseGaugeChart';
import { FC } from 'react';
import Box from '@mui/material/Box';

type MethodResultCompareChartViewProps = {
  value: number;
  percent?: number;
  maxValue: number;
};

export const MethodResultCompareChartView: FC<MethodResultCompareChartViewProps> = (props) => {
  const { value, percent, maxValue } = props;

  return (
    <Box sx={{ mt: 1.5 }}>
      <BaseGaugeChart
        color={getLoadTestResultCompareColor(percent)}
        value={value}
        width={170}
        height={120}
        maxValue={maxValue}
        fontSize={14}
      />
    </Box>
  );
};
