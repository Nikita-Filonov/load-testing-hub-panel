import { BarPlot } from '@mui/x-charts/BarChart';
import {
  ChartsGrid,
  ChartsLegend,
  ChartsTooltip,
  ChartsXAxis,
  ChartsYAxis,
  ResponsiveChartContainer
} from '@mui/x-charts';
import { LineChartXAxis, LineChartYAxis } from './Models';

type BaseLineChartProps<T> = {
  xAxis: LineChartXAxis<T>[];
  yAxis: LineChartYAxis[];
};

export const BaseBarChart = <T,>({ xAxis, yAxis }: BaseLineChartProps<T>) => {
  return (
    <ResponsiveChartContainer xAxis={xAxis} series={yAxis.map((axis) => ({ ...axis, type: 'bar' }))}>
      <BarPlot />
      <ChartsGrid vertical={true} horizontal={true} />
      <ChartsXAxis />
      <ChartsYAxis />
      <ChartsLegend />
      <ChartsTooltip />
    </ResponsiveChartContainer>
  );
};
