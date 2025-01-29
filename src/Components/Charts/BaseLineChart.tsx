import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
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

export const BaseLineChart = <T,>({ xAxis, yAxis }: BaseLineChartProps<T>) => {
  const theme = useTheme();

  return (
    <ResponsiveChartContainer
      margin={{ bottom: 30 }}
      height={300}
      xAxis={xAxis}
      series={yAxis.map((axis) => ({ ...axis, type: 'line' }))}>
      <MarkPlot />
      <LinePlot />
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
      <ChartsAxisHighlight x={'line'} y={'line'} />
    </ResponsiveChartContainer>
  );
};
