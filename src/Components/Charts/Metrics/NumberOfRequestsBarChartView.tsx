import { FC } from 'react';
import { NumberOfRequests } from '../../../Models/Metrics/NumberOfRequests';
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

type NumberOfRequestsBarChartViewProps = {
  type: ChartType.MethodNumberOfRequestsBarChart | ChartType.DashboardNumberOfRequestsBarChart;
  data: (NumberOfRequests & Datetime)[];
  title: string;
  loading: boolean;
};

export const NumberOfRequestsBarChartView: FC<NumberOfRequestsBarChartViewProps> = (props) => {
  const { type, title, loading, data } = props;
  const { range, setRange, filteredData, datetimeData } = useChartRangeData({ data });

  const settings = useSelector((state: ReduxState) => state.core.chartSettings[type]);

  return (
    <BaseChartView title={title} loading={loading} actions={[{ content: <ChartSettingsMenu type={type} /> }]}>
      <BaseBarChart
        xAxis={[{ data: datetimeData, scaleType: 'band', valueFormatter: dateTimeValueFormatter }]}
        yAxis={mapChartYAxisData<NumberOfRequests>({ data: filteredData, settings })}
      />
      <ChartDatetimeRangeSlider data={data} range={range} onRange={setRange} />
    </BaseChartView>
  );
};
