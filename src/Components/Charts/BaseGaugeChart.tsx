import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { FC } from 'react';

type BaseGaugeChartProps = {
  title?: string;
  value: number;
  width?: number;
  color: 'success' | 'error' | 'warning';
  height: number;
  maxValue?: number;
  fontSize?: number;
};

export const BaseGaugeChart: FC<BaseGaugeChartProps> = (props) => {
  const { title, value, width, color, height, maxValue, fontSize } = props;

  return (
    <Gauge
      sx={(theme) => ({
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: fontSize || 20
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: theme.palette[color].main
        }
      })}
      title={title}
      width={width}
      height={height}
      value={value > (maxValue || value) ? maxValue : value}
      valueMax={maxValue === 0 ? value : maxValue}
      startAngle={-110}
      endAngle={110}
      cornerRadius="50%"
      text={() => `${value} / ${maxValue === 0 ? 0 : maxValue}`}
    />
  );
};
