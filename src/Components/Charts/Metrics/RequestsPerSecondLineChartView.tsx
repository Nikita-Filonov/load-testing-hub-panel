import { BaseChartView } from '../BaseChartView';
import { FC } from 'react';
import { mapChartYAxisData, timeValueFormatter } from '../../../Services/Charts/Utils';
import { RequestsPerSecond } from '../../../Models/Metrics/RequestsPerSecond';
import { BaseLineChart } from '../BaseLineChart';
import { ChartSettingsMenu } from '../../Menus/Core/ChartSettingsMenu';
import { ChartType } from '../../../Models/Core/ChartSettings';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { Datetime } from '../../../Models/Datetime';
import { ChartTimeRangeSlider } from '../../Sliders/Charts/ChartTimeRangeSlider';
import { useChartRangeData } from '../../../Services/Charts/Hooks';

type RequestsPerSecondLineChartViewProps = {
  type:
    | ChartType.MethodResultsHistoryRequestsPerSecondLineChart
    | ChartType.LoadTestResultsHistoryRequestsPerSecondLineChart;
  data: (RequestsPerSecond & Datetime)[];
  loading: boolean;
};

export const RequestsPerSecondLineChartView: FC<RequestsPerSecondLineChartViewProps> = ({ type, data, loading }) => {
  const { range, setRange, filteredData, datetimeData } = useChartRangeData({ data });

  const settings = useSelector((state: ReduxState) => state.core.chartSettings[type]);

  return (
    <BaseChartView
      title={'Total requests per second'}
      loading={loading}
      actions={[{ content: <ChartSettingsMenu type={type} /> }]}>
      <BaseLineChart
        xAxis={[{ data: datetimeData, scaleType: 'time', valueFormatter: timeValueFormatter }]}
        yAxis={mapChartYAxisData<RequestsPerSecond>({ data: filteredData, settings })}
      />
      <ChartTimeRangeSlider data={data} range={range} onRange={setRange} />
    </BaseChartView>
  );
};
