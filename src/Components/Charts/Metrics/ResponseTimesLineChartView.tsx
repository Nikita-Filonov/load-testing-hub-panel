import { BaseLineChart } from '../BaseLineChart';
import { BaseChartView } from '../BaseChartView';
import { FC } from 'react';
import { mapChartYAxisData, msValueFormatter, timeValueFormatter } from '../../../Services/Charts/Utils';
import { ResponseTimes } from '../../../Models/Metrics/ResponseTimes';
import { ChartSettingsMenu } from '../../Menus/Core/ChartSettingsMenu';
import { ChartType } from '../../../Models/Core/ChartSettings';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { Datetime } from '../../../Models/Datetime';
import { useChartRangeData } from '../../../Services/Charts/Hooks';
import { ChartTimeRangeSlider } from '../../Sliders/Charts/ChartTimeRangeSlider';
import { MetricGroup } from '../../../Models/Metrics/Base';

type ResponseTimesLineChartViewProps = {
  type: ChartType.MethodResultsHistoryResponseTimesLineChart | ChartType.LoadTestResultsHistoryResponseTimesLineChart;
  data: (ResponseTimes & Datetime)[];
  loading: boolean;
};

export const ResponseTimesLineChartView: FC<ResponseTimesLineChartViewProps> = ({ type, data, loading }) => {
  const { range, setRange, filteredData, datetimeData } = useChartRangeData({ data });

  const settings = useSelector((state: ReduxState) => state.core.chartSettings[type]);

  return (
    <BaseChartView
      title={MetricGroup.ResponseTimes}
      loading={loading}
      actions={[{ content: <ChartSettingsMenu type={type} /> }]}>
      <BaseLineChart
        xAxis={[{ data: datetimeData, scaleType: 'time', valueFormatter: timeValueFormatter }]}
        yAxis={mapChartYAxisData<ResponseTimes>({
          data: filteredData,
          settings,
          valueFormatter: msValueFormatter
        })}
      />
      <ChartTimeRangeSlider data={data} range={range} onRange={setRange} />
    </BaseChartView>
  );
};
