import { BaseGaugeChart } from '../../../Components/Charts/BaseGaugeChart';
import { getLoadTestResultCompareColor } from '../../../Services/Results/Utils';
import { FC } from 'react';
import { BaseGaugeChartView } from '../../../Components/Charts/BaseGaugeChartView';

type LoadTestResultCompareChartViewProps = {
  title: string;
  percent?: number;
  value: number;
  maxValue: number;
  loading?: boolean;
};

export const LoadTestResultCompareChartView: FC<LoadTestResultCompareChartViewProps> = (props) => {
  const { title, percent, value, maxValue, loading } = props;

  return (
    <BaseGaugeChartView title={title} loading={loading}>
      <BaseGaugeChart
        title={title}
        color={getLoadTestResultCompareColor(percent)}
        value={value}
        height={200}
        maxValue={maxValue}
      />
    </BaseGaugeChartView>
  );
};
