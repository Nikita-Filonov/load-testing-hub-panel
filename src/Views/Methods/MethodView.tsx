import { Grid, Typography } from '@mui/material';
import { BaseCard } from '../../Components/Cards/BaseCard';
import { Method } from '../../Models/Results/Methods';
import { FC } from 'react';
import { useAppNavigationService } from '../../Services/HookServices/AppNavigationServiceHook';
import { AppRoutes } from '../../Services/Constants/Routing';
import { BaseLabel } from '../../Components/Labels/BaseLabel';
import { NumberOfRequestsProgress } from '../../Components/Progress/Results/NumberOfRequestsProgress';

type MethodViewProps = {
  method: Method;
};

export const MethodView: FC<MethodViewProps> = ({ method }) => {
  const { onNavigate } = useAppNavigationService();

  const onViewDetails = () => {
    onNavigate(AppRoutes.MethodsDetails, { search: `?method=${method.method}` });
  };

  return (
    <BaseCard actions={[{ title: 'View details', onClick: onViewDetails }]}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant={'subtitle1'}>{method.method}</Typography>
        </Grid>
        <Grid item xs={4} display={'flex'} justifyContent={'flex-end'}>
          <BaseLabel color={'info'} label={'GRPC'} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant={'body2'}>
            <b>Average requests/s:</b> {method.averageRequestsPerSecond}
          </Typography>
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={'flex-end'}>
          <NumberOfRequestsProgress
            requests={method.averageNumberOfRequests}
            failures={method.averageNumberOfFailures}
            requestsTitle={'Average number of requests'}
            failuresTitle={'Average number of failures'}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant={'body2'}>
            <b>Average response time:</b> {method.averageResponseTime}
          </Typography>
        </Grid>
      </Grid>
    </BaseCard>
  );
};
