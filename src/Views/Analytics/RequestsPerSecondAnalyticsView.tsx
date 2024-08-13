import { BaseChartView } from '../../Components/Charts/BaseChartView';
import { dateTimeValueFormatter } from '../../Services/Charts/Utils';
import { FC, useMemo } from 'react';
import dayjs from 'dayjs';
import { RequestsPerSecondAnalytics } from '../../Models/Analytics/RequestsPerSecondAnalytics';
import { BaseBarChart } from '../../Components/Charts/BaseBarChart';
import { green, red } from '@mui/material/colors';

const valueFormatter = dateTimeValueFormatter;

type RequestsPerSecondAnalyticsViewProps = {
  title: string;
  loading: boolean;
  analytics: RequestsPerSecondAnalytics[];
};

export const RequestsPerSecondAnalyticsView: FC<RequestsPerSecondAnalyticsViewProps> = (props) => {
  const { title, loading, analytics } = props;

  const datetimeData = useMemo(() => analytics.map((analytic) => dayjs(analytic.datetime).toDate()), [analytics]);

  return (
    <BaseChartView title={title} loading={loading}>
      <BaseBarChart
        xAxis={[
          { data: datetimeData, scaleType: 'band', valueFormatter },
          { data: datetimeData, scaleType: 'band', valueFormatter }
        ]}
        yAxis={[
          {
            data: analytics.map((result) => result.requestsPerSecond),
            label: 'Total requests/s',
            color: green['500']
          },
          {
            data: analytics.map((result) => result.failuresPerSecond),
            label: 'Total failures/s',
            color: red['300']
          }
        ]}
      />
    </BaseChartView>
  );
};
