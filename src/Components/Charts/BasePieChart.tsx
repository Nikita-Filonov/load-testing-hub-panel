import { PieChart } from '@mui/x-charts';
import { FC } from 'react';

type PieChartSeries = {
  value: number;
  label: string;
  color?: string;
};

type BasePieChartProps = {
  series: PieChartSeries[];
};

export const BasePieChart: FC<BasePieChartProps> = ({ series }) => {
  return (
    <PieChart
      series={[
        {
          data: series.map((item, index) => ({ id: index, ...item }))
        }
      ]}
      height={220}
    />
  );
};
