import { ResponseTimes } from '../../../Models/Metrics/ResponseTimes';
import { BaseChartView } from '../BaseChartView';
import { BaseBarChart } from '../BaseBarChart';
import { dateTimeValueFormatter, mapChartYAxisData, msValueFormatter } from '../../../Services/Charts/Utils';
import { FC } from 'react';
import { ChartSettingsMenu } from '../../Menus/Core/ChartSettingsMenu';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { ChartType } from '../../../Models/Core/ChartSettings';
import { Datetime } from '../../../Models/Datetime';
import { useChartRangeData } from '../../../Services/Charts/Hooks';
import { ChartDatetimeRangeSlider } from '../../Sliders/Charts/ChartDatetimeRangeSlider';

type ResponseTimesBarChartViewProps = {
  type: ChartType.MethodResponseTimesBarChart | ChartType.DashboardResponseTimesBarChart;
  data: (ResponseTimes & Datetime)[];
  title: string;
  loading: boolean;
};

export const ResponseTimesBarChartView: FC<ResponseTimesBarChartViewProps> = ({ type, data, title, loading }) => {
  const { range, setRange, filteredData, datetimeData } = useChartRangeData({ data });

  const settings = useSelector((state: ReduxState) => state.core.chartSettings[type]);

  return (
    <BaseChartView title={title} loading={loading} actions={[{ content: <ChartSettingsMenu type={type} /> }]}>
      <BaseBarChart
        xAxis={[{ data: datetimeData, scaleType: 'band', valueFormatter: dateTimeValueFormatter }]}
        yAxis={mapChartYAxisData<ResponseTimes>({
          data: filteredData,
          settings,
          valueFormatter: msValueFormatter
        })}
      />
      <ChartDatetimeRangeSlider data={data} range={range} onRange={setRange} />
    </BaseChartView>
  );
};
