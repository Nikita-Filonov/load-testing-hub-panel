import { Grid } from '@mui/material';
import { LoadTestResultCompare } from '../../../Models/Results/LoadTestResults';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { FC, useMemo } from 'react';
import { getLoadTestResultCompareTitle } from '../../../Services/Results/Utils';
import { LoadTestResultCompareChartView } from './LoadTestResultCompareChartView';

type LoadTestResultCompareViewProps = {
  compare: LoadTestResultCompare | null;
};

const LoadTestResultCompareView: FC<LoadTestResultCompareViewProps> = ({ compare }) => {
  if (compare === null) {
    return null;
  }

  const averageTitle = useMemo(
    () =>
      getLoadTestResultCompareTitle({
        percent: compare.totalRequestsPerSecondCompareWithAverage,
        context: 'average'
      }),
    [compare.totalRequestsPerSecondCompareWithAverage]
  );

  const previousTitle = useMemo(
    () =>
      getLoadTestResultCompareTitle({
        percent: compare.totalRequestsPerSecondCompareWithPrevious,
        context: 'previous'
      }),
    [compare.totalRequestsPerSecondCompareWithPrevious]
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={6} display={'flex'} alignItems={'center'} flexDirection={'column'}>
        <LoadTestResultCompareChartView
          title={averageTitle}
          value={compare.currentTotalRequestsPerSecond}
          percent={compare.totalRequestsPerSecondCompareWithAverage}
          maxValue={compare.averageTotalRequestsPerSecond}
        />
      </Grid>
      <Grid item xs={6} display={'flex'} alignItems={'center'} flexDirection={'column'}>
        <LoadTestResultCompareChartView
          title={previousTitle}
          value={compare.currentTotalRequestsPerSecond}
          percent={compare.totalRequestsPerSecondCompareWithPrevious}
          maxValue={compare.previousTotalRequestsPerSecond}
        />
      </Grid>
    </Grid>
  );
};

const getState = (state: ReduxState) => ({
  compare: state.loadTestResults.loadTestResultDetails.compare
});
export default connect(getState)(LoadTestResultCompareView);
