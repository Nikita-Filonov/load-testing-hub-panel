import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import {
  ChartsAxisHighlight,
  ChartsDataProvider,
  ChartsGrid,
  ChartsLegend,
  ChartsSurface,
  ChartsTooltip,
  ChartsWrapper,
  ChartsXAxis,
  ChartsYAxis,
  legendClasses
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
    <ChartsDataProvider
      margin={{ bottom: 30 }}
      height={300}
      xAxis={xAxis}
      series={yAxis.map((axis) => ({ ...axis, type: 'line' }))}>
      <ChartsWrapper legendPosition={{ horizontal: 'center', vertical: 'top' }}>
        <ChartsLegend
          sx={{
            [`& .${legendClasses.mark}`]: { width: 13, height: 13 },
            [`& .${legendClasses.label}`]: { fontSize: theme.typography.subtitle2.fontSize }
          }}
        />
        <ChartsSurface>
          <MarkPlot />
          <LinePlot />
          <ChartsGrid vertical={true} horizontal={true} />
          <ChartsXAxis />
          <ChartsYAxis />
          <ChartsTooltip />
          <ChartsAxisHighlight x={'line'} y={'line'} />
        </ChartsSurface>
      </ChartsWrapper>
    </ChartsDataProvider>
  );
};
