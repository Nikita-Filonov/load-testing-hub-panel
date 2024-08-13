import { LoadTestResult } from '../../../Models/Results/LoadTestResults';
import { FC, useMemo } from 'react';
import { BaseCard } from '../../../Components/Cards/BaseCard';
import { Grid, Typography } from '@mui/material';
import { useAppNavigationService } from '../../../Services/HookServices/AppNavigationServiceHook';
import { AppRoutes } from '../../../Services/Constants/Routing';
import dayjs from 'dayjs';
import { SettingsManager } from '../../../Services/Config';
import { getLoadTestResultTitle } from '../../../Services/Results/Utils';
import { LoadTestResultLabelsView } from './LoadTestResultLabelsView';
import { NumberOfRequestsProgress } from '../../../Components/Progress/Results/NumberOfRequestsProgress';

type LoadTestResultViewProps = {
  result: LoadTestResult;
};

export const LoadTestResultView: FC<LoadTestResultViewProps> = ({ result }) => {
  const { onNavigate } = useAppNavigationService();

  const onViewDetails = () => {
    onNavigate(AppRoutes.ResultDetails, { loadTestResultId: result.id });
  };

  const startedAt = useMemo(
    () => dayjs(result.startedAt).format(SettingsManager.apiDateTimeFormat),
    [result.startedAt]
  );

  const finishedAt = useMemo(
    () => dayjs(result.finishedAt).format(SettingsManager.apiDateTimeFormat),
    [result.finishedAt]
  );

  const onOpenTriggerPipeline = () => {
    result.triggerCIPipelineUrl && window.open(result.triggerCIPipelineUrl, '_blank');
  };

  const onOpenLoadTestsPipeline = () => {
    result.loadTestsCIPipelineUrl && window.open(result.loadTestsCIPipelineUrl, '_blank');
  };

  return (
    <BaseCard
      actions={[
        { title: 'View details', onClick: onViewDetails },
        {
          title: 'Open trigger pipeline',
          onClick: onOpenTriggerPipeline,
          disabled: !result.triggerCIPipelineUrl
        },
        {
          title: 'Open load tests pipeline',
          onClick: onOpenLoadTestsPipeline,
          disabled: !result.loadTestsCIPipelineUrl
        }
      ]}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant={'subtitle1'}>{getLoadTestResultTitle(result)}</Typography>
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={'flex-end'} columnSpacing={2}>
          <LoadTestResultLabelsView result={result} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant={'body2'}>
            <b>Total requests/s:</b> {result.totalRequestsPerSecond}
          </Typography>
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={'flex-end'}>
          <NumberOfRequestsProgress
            requests={result.totalRequests}
            failures={result.totalFailures}
            requestsTitle={'Total requests'}
            failuresTitle={'Total failures'}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant={'body2'}>
            <b>Number of users:</b> {result.numberOfUsers}
          </Typography>
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={'flex-end'}>
          <Typography variant={'caption'}>
            {startedAt} — {finishedAt}
          </Typography>
        </Grid>
      </Grid>
    </BaseCard>
  );
};
