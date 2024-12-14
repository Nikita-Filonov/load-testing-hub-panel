import { Grid2, Typography } from '@mui/material';
import { Method } from '../../Models/Results/Methods';
import { FC } from 'react';
import { BaseLabel } from '../../Components/Labels/BaseLabel';
import { NumberOfRequestsProgress } from '../../Components/Progress/Results/NumberOfRequestsProgress';
import { MethodTitleLink } from '../../Components/Links/Methods/MethodTitleLink';
import { BasePaper } from '../../Components/Views/BasePaper';
import { MethodViewMenuItem } from '../../Components/Menus/Methods/MethodViewMenuItem';

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
            <b>Average requests/s:</b> {method.averageRequestsPerSecond}
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 6 }} display={'flex'} justifyContent={'flex-end'}>
          <NumberOfRequestsProgress
            requests={method.averageNumberOfRequests}
            failures={method.averageNumberOfFailures}
            requestsTitle={'Average number of requests'}
            failuresTitle={'Average number of failures'}
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <Typography variant={'body2'}>
            <b>Average response time:</b> {method.averageResponseTime}
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <BaseLabel color={'info'} label={'GRPC'} />
        </Grid2>
      </Grid2>
    </BasePaper>
  );
};
