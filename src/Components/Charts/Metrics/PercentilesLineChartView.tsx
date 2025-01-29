import { Percentiles } from '../../../Models/Metrics/Percentiles';
import { BaseChartView } from '../BaseChartView';
import { BaseLineChart } from '../BaseLineChart';
import { mapChartYAxisData, msValueFormatter, timeValueFormatter } from '../../../Services/Charts/Utils';
import { FC } from 'react';
import { ChartSettingsMenu } from '../../Menus/Core/ChartSettingsMenu';
import { ChartType } from '../../../Models/Core/ChartSettings';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { Datetime } from '../../../Models/Datetime';
import { useChartRangeData } from '../../../Services/Charts/Hooks';
import { ChartTimeRangeSlider } from '../../Sliders/Charts/ChartTimeRangeSlider';

type PercentilesLineChartViewProps = {
  type: ChartType.MethodResultsHistoryPercentilesLineChart | ChartType.LoadTestResultsHistoryPercentilesLineChart;
  data: (Percentiles & Datetime)[];
  title: string;
  loading: boolean;
};

export const PercentilesLineChartView: FC<PercentilesLineChartViewProps> = ({ type, data, title, loading }) => {
  const { range, setRange, filteredData, datetimeData } = useChartRangeData({ data });

  const settings = useSelector((state: ReduxState) => state.core.chartSettings[type]);

  return (
    <BaseChartView title={title} loading={loading} actions={[{ content: <ChartSettingsMenu type={type} /> }]}>
      <BaseLineChart
        xAxis={[{ data: datetimeData, scaleType: 'time', valueFormatter: timeValueFormatter }]}
        yAxis={mapChartYAxisData<Percentiles>({ data: filteredData, settings, valueFormatter: msValueFormatter })}
      />
      <ChartTimeRangeSlider data={data} range={range} onRange={setRange} />
    </BaseChartView>
  );
};
