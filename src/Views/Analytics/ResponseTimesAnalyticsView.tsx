import { BaseChartView } from '../../Components/Charts/BaseChartView';
import { dateTimeValueFormatter } from '../../Services/Charts/Utils';
import { FC, useMemo } from 'react';
import dayjs from 'dayjs';
import { BaseBarChart } from '../../Components/Charts/BaseBarChart';
import { green, red, yellow } from '@mui/material/colors';
import { ResponseTimesAnalytics } from '../../Models/Analytics/ResponseTimesAnalytics';

const valueFormatter = dateTimeValueFormatter;

type ResponseTimesAnalyticsViewProps = {
  title: string;
  loading: boolean;
  analytics: ResponseTimesAnalytics[];
};

export const ResponseTimesAnalyticsView: FC<ResponseTimesAnalyticsViewProps> = (props) => {
  const { title, loading, analytics } = props;

  const datetimeData = useMemo(() => analytics.map((analytic) => dayjs(analytic.datetime).toDate()), [analytics]);

  return (
    <BaseChartView title={title} loading={loading}>
      <BaseBarChart
        xAxis={[
          { data: datetimeData, scaleType: 'band', valueFormatter },
          { data: datetimeData, scaleType: 'band', valueFormatter },
          { data: datetimeData, scaleType: 'band', valueFormatter }
        ]}
        yAxis={[
          {
            data: analytics.map((result) => result.maxResponseTime),
            label: 'Max response time',
            color: red['300']
          },
          {
            data: analytics.map((result) => result.minResponseTime),
            label: 'Min response time',
            color: green['500']
          },
          {
            data: analytics.map((result) => result.averageResponseTime),
            label: 'Average response time',
            color: yellow['400']
          }
        ]}
      />
    </BaseChartView>
  );
};
