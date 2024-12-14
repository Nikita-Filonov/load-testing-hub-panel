import { LoadTestResult } from '../../../Models/Results/LoadTestResults';
import { FC } from 'react';
import { Grid2, Typography } from '@mui/material';
import { getLoadTestResultDates } from '../../../Services/Results/Utils';
import { NumberOfRequestsProgress } from '../../../Components/Progress/Results/NumberOfRequestsProgress';
import { LoadTestResultTitleLink } from '../../../Components/Links/Results/LoadTestResults/LoadTestResultTitleLink';
import { LoadTestResultViewMenu } from '../../../Components/Menus/Results/LoadTestsResults/LoadTestResultViewMenu';
import { BasePaper } from '../../../Components/Views/BasePaper';
import { LoadTestResultLabelsView } from '../../../Components/Labels/Results/LoadTestResults/LoadTestResultLabelsView';
import { LoadTestResultJobButton } from '../../../Components/Buttons/Results/LoadTestResults/LoadTestResultJobButton';

type LoadTestResultViewProps = {
  result: LoadTestResult;
};

export const LoadTestResultView: FC<LoadTestResultViewProps> = ({ result }) => {
  return (
    <BasePaper sx={{ mb: 3 }}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 10 }} display={'flex'} alignItems={'center'}>
          <LoadTestResultTitleLink result={result} />
        </Grid2>
        <Grid2 size={{ xs: 2 }} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
          <LoadTestResultViewMenu result={result} />
        </Grid2>
        <Grid2 size={{ xs: 6 }}>
          <Typography variant={'body2'}>
            <b>Total requests/s:</b> {result.totalRequestsPerSecond}
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 6 }} display={'flex'} justifyContent={'flex-end'}>
          <NumberOfRequestsProgress
            requests={result.totalRequests}
            failures={result.totalFailures}
            requestsTitle={'Total requests'}
            failuresTitle={'Total failures'}
          />
        </Grid2>
        <Grid2 size={{ xs: 6 }}>
          <Typography variant={'body2'}>
            <b>Number of users:</b> {result.numberOfUsers}
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 6 }} display={'flex'} justifyContent={'flex-end'}>
          <Typography variant={'caption'}>{getLoadTestResultDates(result)}</Typography>
        </Grid2>
        {result.comment && (
          <Grid2 size={{ xs: 12 }} display={'flex'}>
            <Typography variant={'body2'}>
              <b>Comment:</b> {result.comment}
            </Typography>
          </Grid2>
        )}
        <Grid2 size={{ xs: 10 }} display={'flex'} alignItems={'center'}>
          <LoadTestResultLabelsView result={result} />
        </Grid2>
        <Grid2 size={{ xs: 2 }} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
          <LoadTestResultJobButton result={result} />
        </Grid2>
      </Grid2>
    </BasePaper>
  );
};
