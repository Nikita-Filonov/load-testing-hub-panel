import { BaseLineChart } from '../BaseLineChart';
import dayjs from 'dayjs';
import { sliceRangeData, timeValueFormatter } from '../../../Services/Charts/Utils';
import { BaseChartView } from '../BaseChartView';
import { ResponseTimes } from '../../../Models/Metrics/ResponseTimes';
import { NumberOfUsers } from '../../../Models/Metrics/NumberOfUsers';
import { NumberOfRequests } from '../../../Models/Metrics/NumberOfRequests';
import { RequestsPerSecond } from '../../../Models/Metrics/RequestsPerSecond';
import { CompareResultsHistory } from '../../../Models/Compares/CompareResultsHistory';
import { LineChartYAxis } from '../Models';
import { ChartTimeRangeSlider } from '../../Sliders/Charts/ChartTimeRangeSlider';
import { useEffect, useMemo, useState } from 'react';

type DataType = ResponseTimes | NumberOfUsers | NumberOfRequests | RequestsPerSecond;

type Props<Data extends DataType> = {
  data: CompareResultsHistory<Data>[];
  title: string;
  metric: keyof Data;
  loading: boolean;
} & Pick<LineChartYAxis, 'valueFormatter'>;

export const CompareResultsHistoryLineChartView = <Data extends DataType>(props: Props<Data>) => {
  const { data, title, metric, loading, valueFormatter } = props;
  const initialData = data[0]?.results || [];
  const [range, setRange] = useState<number[]>([0, initialData.length - 1]);

  useEffect(() => {
    setRange([0, initialData.length - 1]);
  }, [initialData.length]);

  const filteredData = useMemo(
    () =>
      data.map((compare) => ({
        ...compare,
        results: sliceRangeData({ data: compare.results, range })
      })),
    [data, range]
  );

  return (
    <BaseChartView title={title} loading={loading}>
      <BaseLineChart
        xAxis={filteredData.map((compare) => ({
          data: compare.results.map((result) => dayjs(result.datetime).toDate()),
          scaleType: 'time',
          valueFormatter: timeValueFormatter
        }))}
        yAxis={filteredData.map((compare) => ({
          data: compare.results.map((result) => result.metrics[metric] as number),
          label: compare.title,
          valueFormatter
        }))}
      />
      <ChartTimeRangeSlider data={initialData} range={range} onRange={setRange} />
    </BaseChartView>
  );
};
