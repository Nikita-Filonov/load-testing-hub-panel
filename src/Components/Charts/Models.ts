import { AxisValueFormatterContext } from '@mui/x-charts/models/axis';

export interface LineChartYAxis {
  data: (null | number)[];
  label: string;
  color?: string;
}

export interface LineChartXAxis<T> {
  data: T[];
  scaleType: 'time' | 'band';
  valueFormatter?: (value: T, context: AxisValueFormatterContext) => string;
}
