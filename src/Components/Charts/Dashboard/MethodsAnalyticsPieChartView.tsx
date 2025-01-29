import { BaseChartView } from '../BaseChartView';
import { BasePieChart } from '../BasePieChart';
import {
  MethodsNumberOfRequestsAnalytics,
  MethodsRequestsPerSecondAnalytics,
  MethodsResponseTimesAnalytics
} from '../../../Models/Analytics/MethodsAnalytics';
import { MakeOptional } from '@mui/x-charts/internals';
import { PieValueType } from '@mui/x-charts';
import { getMethodLabel } from '../../../Services/Methods/Utils';

type DataType = MethodsResponseTimesAnalytics | MethodsNumberOfRequestsAnalytics | MethodsRequestsPerSecondAnalytics;

type MethodsAnalyticsPieChartViewProps<Data extends DataType> = {
  data: Data[];
  title: string;
  metric: keyof Omit<Data, 'method'>;
  loading: boolean;
  valueFormatter?: (data: MakeOptional<PieValueType, 'id'>) => string | null;
};

export const MethodsAnalyticsPieChartView = <Data extends DataType>(props: MethodsAnalyticsPieChartViewProps<Data>) => {
  const { data, title, metric, loading, valueFormatter } = props;

  return (
    <BaseChartView title={title} loading={loading}>
      <BasePieChart
        series={data.map((data) => ({ label: getMethodLabel(data.method), value: data[metric] as number }))}
        valueFormatter={valueFormatter}
      />
    </BaseChartView>
  );
};
