import { FC } from 'react';
import { RequestsPerSecond } from '../../../Models/Metrics/RequestsPerSecond';
import { BaseChartView } from '../BaseChartView';
import { BaseBarChart } from '../BaseBarChart';
import { dateTimeValueFormatter, mapChartYAxisData } from '../../../Services/Charts/Utils';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { ChartType } from '../../../Models/Core/ChartSettings';
import { ChartSettingsMenu } from '../../Menus/Core/ChartSettingsMenu';
import { Datetime } from '../../../Models/Datetime';
import { useChartRangeData } from '../../../Services/Charts/Hooks';
import { ChartDatetimeRangeSlider } from '../../Sliders/Charts/ChartDatetimeRangeSlider';

type RequestsPerSecondBarChartViewProps = {
  type: ChartType.MethodRequestsPerSecondBarChart | ChartType.DashboardRequestsPerSecondBarChart;
  data: (RequestsPerSecond & Datetime)[];
  title: string;
  loading: boolean;
};

export const RequestsPerSecondBarChartView: FC<RequestsPerSecondBarChartViewProps> = (props) => {
  const { type, data, title, loading } = props;
  const { range, setRange, filteredData, datetimeData } = useChartRangeData({ data });

  const settings = useSelector((state: ReduxState) => state.core.chartSettings[type]);

  return (
    <BaseChartView title={title} loading={loading} actions={[{ content: <ChartSettingsMenu type={type} /> }]}>
      <BaseBarChart
        xAxis={[{ data: datetimeData, scaleType: 'band', valueFormatter: dateTimeValueFormatter }]}
        yAxis={mapChartYAxisData<RequestsPerSecond>({ data: filteredData, settings })}
      />
      <ChartDatetimeRangeSlider data={data} range={range} onRange={setRange} />
    </BaseChartView>
  );
};
