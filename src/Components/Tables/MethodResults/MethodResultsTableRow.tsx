import { BaseTableRow } from '../BaseTableRow';
import { FC } from 'react';
import { MethodResult } from '../../../Models/Results/MethodResults';
import IconButton from '@mui/material/IconButton';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import { useAppNavigationService } from '../../../Services/HookServices/AppNavigationServiceHook';
import { AppRoutes } from '../../../Services/Constants/Routing';

type MethodResultsTableRowProps = {
  result: MethodResult;
};

export const MethodResultsTableRow: FC<MethodResultsTableRowProps> = ({ result }) => {
  const { onNavigate } = useAppNavigationService();

  const onViewMethodAnalytics = () => {
    onNavigate(AppRoutes.MethodsDetails, { search: `?method=${result.method}` });
  };

  return (
    <BaseTableRow
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
        { value: result.averageResponseTime }
      ]}
    />
  );
};
