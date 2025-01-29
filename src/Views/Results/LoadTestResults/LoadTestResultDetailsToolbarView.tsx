import { FC } from 'react';
import { LoadTestsResultsCompareMenu } from '../../../Components/Menus/Results/LoadTestsResults/LoadTestsResultsCompareMenu';
import BaseLoadTestResultDetailsToolbarView from './BaseLoadTestResultDetailsToolbarView';

type LoadTestResultDetailsToolbarViewProps = {
  loadTestResultId: number;
};

export const LoadTestResultDetailsToolbarView: FC<LoadTestResultDetailsToolbarViewProps> = ({ loadTestResultId }) => {
  return (
    <BaseLoadTestResultDetailsToolbarView
      title={'Load tests result details'}
      actions={[{ content: <LoadTestsResultsCompareMenu loadTestResultId={loadTestResultId} /> }]}
    />
  );
};
