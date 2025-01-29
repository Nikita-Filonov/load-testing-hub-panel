import { PieChart, PieValueType } from '@mui/x-charts';
import { FC } from 'react';
import { MakeOptional } from '@mui/x-charts/internals';

type PieChartSeries = {
  value: number;
  label: string;
  color?: string;
};

type BasePieChartProps = {
  series: PieChartSeries[];
  valueFormatter?: (data: MakeOptional<PieValueType, 'id'>) => string | null;
};

const defaultValueFormatter = (data: MakeOptional<PieValueType, 'id'>) => `${data.value}`;

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
