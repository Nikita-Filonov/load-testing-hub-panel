import { BaseRangeSlider } from '../BaseRangeSlider';
import { RangeSliderMinMaxView } from '../RangeSliderMinMaxView';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import { SettingsManager } from '../../../Services/Config';
import { Datetime } from '../../../Models/Datetime';
import { getDurationFromDatetimeData } from '../../../Services/Charts/Utils';
import Box from '@mui/material/Box';

type Props<Data extends Datetime> = {
  data: Data[];
  range: number[];
  onRange: (range: number[]) => void;
};

export const ChartTimeRangeSlider = <Data extends Datetime>({ data, range, onRange }: Props<Data>) => {
  if (data.length === 0) return null;

  const { endTime, startTime, duration } = useMemo(() => getDurationFromDatetimeData(data), [data]);

  return (
    <Box>
      <BaseRangeSlider
        max={data.length - 1}
        range={range}
        onRange={onRange}
        valueLabelFormat={(value) => dayjs(data[value].datetime).format(SettingsManager.apiTimeFormat)}
      />
      <RangeSliderMinMaxView min={startTime} max={endTime} middle={duration} />
    </Box>
  );
};
