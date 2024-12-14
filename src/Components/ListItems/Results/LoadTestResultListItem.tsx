import { LoadTestResult } from '../../../Models/Results/LoadTestResults';
import { FC } from 'react';
import { BaseListItem } from '../BaseListItem';
import Checkbox from '@mui/material/Checkbox';
import { getLoadTestResultDates, getLoadTestResultTitle } from '../../../Services/Results/Utils';
import { NumberOfRequestsProgress } from '../../Progress/Results/NumberOfRequestsProgress';
import { LoadTestResultListItemMenu } from '../../Menus/Results/LoadTestsResults/LoadTestResultListItemMenu';

type LoadTestResultListItemProps = {
  selected: boolean;
  result: LoadTestResult;
  onSelectResult: (loadTestResultId: number) => void;
};

export const LoadTestResultListItem: FC<LoadTestResultListItemProps> = (props) => {
  const { selected, result, onSelectResult } = props;

  const onSelect = () => onSelectResult(result.id);

  return (
    <BaseListItem
      icon={<Checkbox size={'small'} checked={selected} disableRipple />}
      menu={<LoadTestResultListItemMenu result={result} />}
      dense={true}
      title={getLoadTestResultTitle(result)}
      subtitle={getLoadTestResultDates(result)}
      label={
        <NumberOfRequestsProgress
          requests={result.totalRequests}
          failures={result.totalFailures}
          requestsTitle={'Total requests'}
          failuresTitle={'Total failures'}
        />
      }
      onClick={onSelect}
    />
  );
};
