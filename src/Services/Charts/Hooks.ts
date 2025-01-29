import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { Datetime } from '../../Models/Datetime';
import { sliceRangeData } from './Utils';

export const useChartRangeData = <Data extends Datetime>({ data }: { data: Data[] }) => {
  const [range, setRange] = useState<number[]>([0, data.length - 1]);

  useEffect(() => {
    setRange([0, data.length - 1]);
  }, [data.length]);

  const filteredData = useMemo(() => sliceRangeData({ data, range }), [data, range]);
  const datetimeData = useMemo(() => filteredData.map((result) => dayjs(result.datetime).toDate()), [filteredData]);

  return { range, setRange, filteredData, datetimeData };
};
