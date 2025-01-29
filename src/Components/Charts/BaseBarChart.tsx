import { BarPlot } from '@mui/x-charts/BarChart';
import {
  ChartsAxisHighlight,
  ChartsGrid,
  ChartsLegend,
  ChartsTooltip,
  ChartsXAxis,
  ChartsYAxis,
  ResponsiveChartContainer
} from '@mui/x-charts';
import { LineChartXAxis, LineChartYAxis } from './Models';
import { useTheme } from '@mui/material';

type BaseLineChartProps<T> = {
  xAxis: LineChartXAxis<T>[];
  yAxis: LineChartYAxis[];
};

export const BaseBarChart = <T,>({ xAxis, yAxis }: BaseLineChartProps<T>) => {
  const theme = useTheme();

  return (
    <ResponsiveChartContainer
      margin={{ bottom: 30 }}
      height={300}
      xAxis={xAxis}
      series={yAxis.map((axis) => ({ ...axis, type: 'bar' }))}>
      <BarPlot />
      <ChartsGrid vertical={true} horizontal={true} />
      <ChartsXAxis />
      <ChartsYAxis />
      <ChartsLegend
        itemMarkHeight={13}
        itemMarkWidth={13}
        position={{ horizontal: 'middle', vertical: 'top' }}
        labelStyle={{ fontSize: theme.typography.subtitle2.fontSize }}
      />
      <ChartsTooltip />
      <ChartsAxisHighlight x={'band'} />
    </ResponsiveChartContainer>
  );
};
