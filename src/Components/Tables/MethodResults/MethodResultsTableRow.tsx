import { BaseTableRow } from '../BaseTableRow';
import { FC } from 'react';
import { MethodResult } from '../../../Models/Results/MethodResults';
import IconButton from '@mui/material/IconButton';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import { useMethodsNavigation } from '../../../Services/Methods/Hooks';

type MethodResultsTableRowProps = {
  result: MethodResult;
};

export const MethodResultsTableRow: FC<MethodResultsTableRowProps> = ({ result }) => {
  const { navigateMethodDetails } = useMethodsNavigation();

  const onViewMethodAnalytics = () => navigateMethodDetails(result.method);

  return (
    <BaseTableRow
      hover
      cells={[
        {
          value: (
            <IconButton onClick={onViewMethodAnalytics}>
              <AnalyticsOutlinedIcon />
            </IconButton>
          )
        },
        { value: result.method },
        { value: result.maxResponseTime },
        { value: result.minResponseTime },
        { value: result.numberOfRequests },
        { value: result.numberOfFailures },
        { value: result.totalResponseTime },
        { value: result.requestsPerSecond },
        { value: result.failuresPerSecond },
        { value: result.averageResponseTime },
        { value: result.averageContentLength }
      ]}
    />
  );
};
