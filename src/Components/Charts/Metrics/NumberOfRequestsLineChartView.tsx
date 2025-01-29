import { BaseLineChart } from '../BaseLineChart';
import { BaseChartView } from '../BaseChartView';
import { FC } from 'react';
import { mapChartYAxisData, timeValueFormatter } from '../../../Services/Charts/Utils';
import { NumberOfRequests } from '../../../Models/Metrics/NumberOfRequests';
import { ChartType } from '../../../Models/Core/ChartSettings';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { ChartSettingsMenu } from '../../Menus/Core/ChartSettingsMenu';
import { Datetime } from '../../../Models/Datetime';
import { useChartRangeData } from '../../../Services/Charts/Hooks';
import { ChartTimeRangeSlider } from '../../Sliders/Charts/ChartTimeRangeSlider';

type NumberOfRequestsLineChartViewProps = {
  type:
    | ChartType.MethodResultsHistoryNumberOfRequestsLineChart
    | ChartType.LoadTestResultsHistoryNumberOfRequestsLineChart;
  data: (NumberOfRequests & Datetime)[];
  loading: boolean;
};

export const NumberOfRequestsLineChartView: FC<NumberOfRequestsLineChartViewProps> = ({ type, data, loading }) => {
  const { range, setRange, filteredData, datetimeData } = useChartRangeData({ data });

  const settings = useSelector((state: ReduxState) => state.core.chartSettings[type]);

  return (
    <BaseChartView
      title={'Total number of requests'}
      loading={loading}
      actions={[{ content: <ChartSettingsMenu type={type} /> }]}>
      <BaseLineChart
        xAxis={[{ data: datetimeData, scaleType: 'time', valueFormatter: timeValueFormatter }]}
        yAxis={mapChartYAxisData<NumberOfRequests>({ data: filteredData, settings })}
      />
      <ChartTimeRangeSlider data={data} range={range} onRange={setRange} />
    </BaseChartView>
  );
};
