import { Percentiles } from '../../../Models/Metrics/Percentiles';
import { BaseChartView } from '../BaseChartView';
import { dateTimeValueFormatter, mapChartYAxisData, msValueFormatter } from '../../../Services/Charts/Utils';
import { FC } from 'react';
import { ChartSettingsMenu } from '../../Menus/Core/ChartSettingsMenu';
import { ChartType } from '../../../Models/Core/ChartSettings';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { BaseBarChart } from '../BaseBarChart';
import { Datetime } from '../../../Models/Datetime';
import { ChartDatetimeRangeSlider } from '../../Sliders/Charts/ChartDatetimeRangeSlider';
import { useChartRangeData } from '../../../Services/Charts/Hooks';

type PercentilesBarChartViewProps = {
  type: ChartType.MethodPercentilesBarChart | ChartType.DashboardPercentilesBarChart;
  data: (Percentiles & Datetime)[];
  title: string;
  loading: boolean;
};

export const PercentilesBarChartView: FC<PercentilesBarChartViewProps> = ({ type, data, title, loading }) => {
  const { range, setRange, filteredData, datetimeData } = useChartRangeData({ data });

  const settings = useSelector((state: ReduxState) => state.core.chartSettings[type]);

  return (
    <BaseChartView title={title} loading={loading} actions={[{ content: <ChartSettingsMenu type={type} /> }]}>
      <BaseBarChart
        xAxis={[{ data: datetimeData, scaleType: 'band', valueFormatter: dateTimeValueFormatter }]}
        yAxis={mapChartYAxisData<Percentiles>({ data: filteredData, settings, valueFormatter: msValueFormatter })}
      />
      <ChartDatetimeRangeSlider data={data} range={range} onRange={setRange} />
    </BaseChartView>
  );
};
