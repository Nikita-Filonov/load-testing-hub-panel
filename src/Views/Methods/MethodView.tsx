import { Grid2, Typography } from '@mui/material';
import { Method } from '../../Models/Methods/Methods';
import { FC } from 'react';
import { NumberOfRequestsProgress } from '../../Components/Progress/Results/NumberOfRequestsProgress';
import { MethodTitleLink } from '../../Components/Links/Methods/MethodTitleLink';
import { BasePaper } from '../../Components/Views/BasePaper';
import { MethodViewMenuItem } from '../../Components/Menus/Methods/MethodViewMenuItem';
import { MetricName } from '../../Models/Metrics/Base';
import { MethodResultProtocolLabel } from '../../Components/Labels/Results/MethodResults/MethodResultProtocolLabel';

type MethodViewProps = {
  method: Method;
};

export const MethodView: FC<MethodViewProps> = ({ method }) => {
  return (
    <BasePaper sx={{ mb: 3 }}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 10 }} display={'flex'} alignItems={'center'}>
          <MethodTitleLink method={method.method} />
        </Grid2>
        <Grid2 size={{ xs: 2 }} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
          <MethodViewMenuItem method={method.method} />
        </Grid2>
        <Grid2 size={{ xs: 6 }}>
          <Typography variant={'body2'}>
            <b>{MetricName.RequestsPerSecond}:</b> {method.requestsPerSecond}
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 6 }} display={'flex'} justifyContent={'flex-end'}>
          <NumberOfRequestsProgress
            requests={method.numberOfRequests}
            failures={method.numberOfFailures}
            requestsTitle={MetricName.NumberOfRequests}
            failuresTitle={MetricName.NumberOfFailures}
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <Typography variant={'body2'}>
            <b>{MetricName.AverageResponseTime}:</b> {method.averageResponseTime}
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <MethodResultProtocolLabel />
        </Grid2>
      </Grid2>
    </BasePaper>
  );
};
