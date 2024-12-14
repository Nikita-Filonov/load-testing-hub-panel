import { BaseRouterLink } from '../../BaseRouterLink';
import { LoadTestResult } from '../../../../Models/Results/LoadTestResults';
import { FC } from 'react';
import { getLoadTestResultTitle } from '../../../../Services/Results/Utils';
import { useLoadTestResultsNavigation } from '../../../../Services/Results/Hooks';

type LoadTestResultTitleLinkProps = {
  result: LoadTestResult;
};

export const LoadTestResultTitleLink: FC<LoadTestResultTitleLinkProps> = ({ result }) => {
  const { getLoadTestResultDetailsURL, getLoadTestResultDetailsRoute } = useLoadTestResultsNavigation();

  return (
    <BaseRouterLink
      to={{ pathname: getLoadTestResultDetailsRoute(result.id) }}
      copyURL={getLoadTestResultDetailsURL(result.id)}
      allowCopy>
      {getLoadTestResultTitle(result)}
    </BaseRouterLink>
  );
};
