import { WidgetView } from '../../../Components/Views/WidgetView';
import { MethodResultScenarioCompare } from '../../../Models/Results/MethodResults';
import { FC, useMemo } from 'react';
import { MethodResultCompareChartView } from './MethodResultCompareChartView';
import Typography from '@mui/material/Typography';
import { getLoadTestResultCompareTitle } from '../../../Services/Results/Utils';
import { getMethodLabel } from '../../../Services/Charts/Utils';

type MethodResultScenarioCompareViewProps = {
  compare: MethodResultScenarioCompare;
};

export const MethodResultScenarioCompareView: FC<MethodResultScenarioCompareViewProps> = ({ compare }) => {
  const title = useMemo(
    () =>
      getLoadTestResultCompareTitle({
        percent: compare.requestsPerSecondCompare,
        context: 'SLA'
      }),
    [compare.requestsPerSecondCompare]
  );

  return (
    <WidgetView title={getMethodLabel(compare.method)}>
      <Typography sx={{ mt: 3 }}>{title}</Typography>
      <MethodResultCompareChartView
        value={compare.currentRequestsPerSecond}
        percent={compare.requestsPerSecondCompare}
        maxValue={compare.scenarioRequestsPerSecond}
      />
    </WidgetView>
  );
};
