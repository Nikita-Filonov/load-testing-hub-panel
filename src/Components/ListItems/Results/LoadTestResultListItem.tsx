import { LoadTestResult } from '../../../Models/Results/LoadTestResults';
import { FC } from 'react';
import { BaseListItem } from '../BaseListItem';
import Checkbox from '@mui/material/Checkbox';
import { getLoadTestResultDates, getLoadTestResultTitle } from '../../../Services/Results/Utils';
import { NumberOfRequestsProgress } from '../../Progress/Results/NumberOfRequestsProgress';
import { LoadTestResultListItemMenu } from '../../Menus/Results/LoadTestsResults/LoadTestResultListItemMenu';
import { MetricName } from '../../../Models/Metrics/Base';

type LoadTestResultListItemProps = {
  selected: boolean;
  result: LoadTestResult;
  onSelectResult: (loadTestResultId: number) => void;
  onScenarioDetails: (result: LoadTestResult) => void;
};

export const LoadTestResultListItem: FC<LoadTestResultListItemProps> = (props) => {
  const { selected, result, onSelectResult, onScenarioDetails } = props;

  const onSelect = () => onSelectResult(result.id);

  return (
    <BaseListItem
      icon={<Checkbox size={'small'} checked={selected} disableRipple />}
      menu={<LoadTestResultListItemMenu result={result} onScenarioDetails={onScenarioDetails} />}
      dense={true}
      title={getLoadTestResultTitle(result)}
      subtitle={getLoadTestResultDates(result)}
      label={
        <NumberOfRequestsProgress
          requests={result.numberOfRequests}
          failures={result.numberOfFailures}
          requestsTitle={MetricName.NumberOfRequests}
          failuresTitle={MetricName.NumberOfFailures}
        />
      }
      onClick={onSelect}
    />
  );
};
