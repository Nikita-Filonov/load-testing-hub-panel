import { FC, useState } from 'react';
import { BaseMenu } from '../../BaseMenu';
import { BaseMenuItem } from '../../BaseMenuItem';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { useAppNavigationService } from '../../../../Services/HookServices/AppNavigationServiceHook';
import { AppRoutes } from '../../../../Services/Constants/Routing';

type LoadTestsResultsGrafanaMenuProps = {
  loadTestResultId: number;
};

export const LoadTestsResultsCompareMenu: FC<LoadTestsResultsGrafanaMenuProps> = ({ loadTestResultId }) => {
  const { onNavigate } = useAppNavigationService();
  const [menu, setMenu] = useState<null | HTMLElement>(null);

  const onShowComparisonWithSLA = () => {
    onNavigate(AppRoutes.ResultCompareWithScenario, { loadTestResultId });
  };

  const onShowComparisonWithActualData = () => {
    onNavigate(AppRoutes.ResultCompareWithActualData, { loadTestResultId });
  };

  return (
    <BaseMenu menu={menu} setMenu={setMenu} icon={<CompareArrowsIcon />}>
      <BaseMenuItem icon={<CompareArrowsIcon />} label={'Show comparison with SLA'} onClick={onShowComparisonWithSLA} />
      <BaseMenuItem
        icon={<CompareArrowsIcon />}
        label={'Show comparison with actual data'}
        onClick={onShowComparisonWithActualData}
      />
    </BaseMenu>
  );
};
