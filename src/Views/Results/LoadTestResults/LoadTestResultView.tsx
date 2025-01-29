import { LoadTestResult } from '../../../Models/Results/LoadTestResults';
import { FC } from 'react';
import { Grid2, Typography } from '@mui/material';
import { getLoadTestResultDates, getLoadTestResultDuration } from '../../../Services/Results/Utils';
import { NumberOfRequestsProgress } from '../../../Components/Progress/Results/NumberOfRequestsProgress';
import { LoadTestResultTitleLink } from '../../../Components/Links/Results/LoadTestResults/LoadTestResultTitleLink';
import { LoadTestResultViewMenu } from '../../../Components/Menus/Results/LoadTestsResults/LoadTestResultViewMenu';
import { BasePaper } from '../../../Components/Views/BasePaper';
import { LoadTestResultLabelsView } from '../../../Components/Labels/Results/LoadTestResults/LoadTestResultLabelsView';
import { LoadTestResultJobButton } from '../../../Components/Buttons/Results/LoadTestResults/LoadTestResultJobButton';
import { MetricName } from '../../../Models/Metrics/Base';

type LoadTestResultViewProps = {
  result: LoadTestResult;
  onSetComment: (result: LoadTestResult) => void;
  onScenarioDetails: (result: LoadTestResult) => void;
};

export const LoadTestResultView: FC<LoadTestResultViewProps> = (props) => {
  const { result, onSetComment, onScenarioDetails } = props;

  return (
    <BasePaper sx={{ mb: 3 }}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 10 }} display={'flex'} alignItems={'center'}>
          <LoadTestResultTitleLink result={result} />
        </Grid2>
        <Grid2 size={{ xs: 2 }} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
          <LoadTestResultViewMenu result={result} onSetComment={onSetComment} onScenarioDetails={onScenarioDetails} />
        </Grid2>
        <Grid2 size={{ xs: 6 }}>
          <Typography variant={'body2'}>
            <b>{MetricName.RequestsPerSecond}:</b> {result.requestsPerSecond}
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 6 }} display={'flex'} justifyContent={'flex-end'}>
          <NumberOfRequestsProgress
            requests={result.numberOfRequests}
            failures={result.numberOfFailures}
            requestsTitle={MetricName.NumberOfRequests}
            failuresTitle={MetricName.NumberOfFailures}
          />
        </Grid2>
        <Grid2 size={{ xs: 6 }}>
          <Typography variant={'body2'}>
            <b>{MetricName.NumberOfUsers}:</b> {result.numberOfUsers}
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 6 }} display={'flex'} justifyContent={'flex-end'}>
          <Typography variant={'caption'}>
            {getLoadTestResultDates(result)}, {getLoadTestResultDuration(result)}
          </Typography>
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
