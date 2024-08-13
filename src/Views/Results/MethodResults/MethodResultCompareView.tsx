import { WidgetView } from '../../../Components/Views/WidgetView';
import { Grid } from '@mui/material';
import { MethodResultCompare } from '../../../Models/Results/MethodResults';
import { FC, useMemo } from 'react';
import { MethodResultCompareChartView } from './MethodResultCompareChartView';
import Typography from '@mui/material/Typography';
import { getLoadTestResultCompareTitle } from '../../../Services/Results/Utils';
import { getMethodLabel } from '../../../Services/Charts/Utils';

type MethodResultCompareViewProps = {
  compare: MethodResultCompare;
};

export const MethodResultCompareView: FC<MethodResultCompareViewProps> = ({ compare }) => {
  const averageTitle = useMemo(
    () =>
      getLoadTestResultCompareTitle({
        percent: compare.requestsPerSecondCompareWithAverage,
        context: 'average'
      }),
    [compare.requestsPerSecondCompareWithAverage]
  );

  const previousTitle = useMemo(
    () =>
      getLoadTestResultCompareTitle({
        percent: compare.requestsPerSecondCompareWithPrevious,
        context: 'previous'
      }),
    [compare.requestsPerSecondCompareWithPrevious]
  );

  return (
    <WidgetView title={getMethodLabel(compare.method)} childrenSx={{ display: 'flex' }}>
      <Grid container spacing={2} display={'flex'} alignItems={'center'}>
        <Grid item xs={6} sx={{ mt: 3 }}>
          <Typography>{averageTitle}</Typography>
          <MethodResultCompareChartView
            value={compare.currentRequestsPerSecond}
            percent={compare.requestsPerSecondCompareWithAverage}
            maxValue={compare.averageRequestsPerSecond}
          />
        </Grid>
        <Grid item xs={6} sx={{ mt: 3 }}>
          <Typography>{previousTitle}</Typography>
          <MethodResultCompareChartView
            value={compare.currentRequestsPerSecond}
            percent={compare.requestsPerSecondCompareWithPrevious}
            maxValue={compare.previousRequestsPerSecond}
          />
        </Grid>
      </Grid>
    </WidgetView>
  );
};
