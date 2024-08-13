import { FC } from 'react';
import { BaseLabel } from '../../../Components/Labels/BaseLabel';
import { LoadTestResultCompareLabel } from '../../../Components/Labels/LoadTestResults/LoadTestResultCompareLabel';
import { LoadTestResult } from '../../../Models/Results/LoadTestResults';
import { LabelsView } from '../../../Components/Labels/LabelsView';

type LoadTestResultLabelsViewProps = {
  result: LoadTestResult;
};

export const LoadTestResultLabelsView: FC<LoadTestResultLabelsViewProps> = ({ result }) => {
  return (
    <LabelsView>
      {result.triggerCIProjectVersion && <BaseLabel color={'info'} label={result.triggerCIProjectVersion} />}
      <LoadTestResultCompareLabel
        percent={result.compare?.totalRequestsPerSecondCompareWithAverage}
        context={'average'}
      />
      <LoadTestResultCompareLabel
        percent={result.compare?.totalRequestsPerSecondCompareWithPrevious}
        context={'previous'}
      />
    </LabelsView>
  );
};
