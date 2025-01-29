import { Slider } from '@mui/material';
import { FC, ReactNode } from 'react';

type Props = {
  max: number;
  range: number[];
  onRange: (range: number[]) => void;
  valueLabelFormat?: (value: number, index: number) => ReactNode;
};

export const BaseRangeSlider: FC<Props> = (props) => {
  const { max, range, onRange, valueLabelFormat } = props;

  const onChange = (_: Event, value: number | number[]) => {
    if (!Array.isArray(value)) {
      return;
    }

    let [start, end] = value;
    if (start > end) {
      [start, end] = [end, start];
    }

    if (end - start < 2) {
      return;
    }

    onRange([start, end]);
  };

  return (
    <Slider
      min={0}
      max={max}
      size={'small'}
      marks
      value={range}
      onChange={onChange}
      valueLabelFormat={valueLabelFormat}
      valueLabelDisplay="auto"
    />
  );
};
