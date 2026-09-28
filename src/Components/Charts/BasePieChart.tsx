import { PieChart, PieValueType } from '@mui/x-charts';
import { FC } from 'react';

type PieValue = Omit<PieValueType, 'id'> & { id?: PieValueType['id'] };

type PieChartSeries = {
  value: number;
  label: string;
  color?: string;
};

type BasePieChartProps = {
  series: PieChartSeries[];
  valueFormatter?: (data: PieValue) => string | null;
};

const defaultValueFormatter = (data: PieValue) => `${data.value}`;

export const BasePieChart: FC<BasePieChartProps> = ({ series, valueFormatter }) => {
  return (
    <PieChart
      series={[
        {
          data: series.map((item, index) => ({ id: index, ...item })),
          innerRadius: 30,
          paddingAngle: 5,
          cornerRadius: 5,
          valueFormatter: valueFormatter || defaultValueFormatter
        }
      ]}
      height={220}
    />
  );
};
