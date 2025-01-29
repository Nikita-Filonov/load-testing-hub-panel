import { FC, useState } from 'react';
import { BaseMenu } from '../../BaseMenu';
import { BaseMenuItem } from '../../BaseMenuItem';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { useLoadTestResultsNavigation } from '../../../../Services/Results/Hooks';

type Props = {
  loadTestResultId: number;
};

export const LoadTestsResultsCompareMenu: FC<Props> = ({ loadTestResultId }) => {
  const { navigateCompareWithResults, navigateCompareWithAverages, navigateCompareWithScenario } =
    useLoadTestResultsNavigation();
  const [menu, setMenu] = useState<null | HTMLElement>(null);

  const onClose = () => setMenu(null);

  const onCompareWithResults = () => {
    onClose();
    navigateCompareWithResults(loadTestResultId);
  };

  const onCompareWithAverages = () => {
    onClose();
    navigateCompareWithAverages(loadTestResultId);
  };

  const onCompareWithScenario = () => {
    onClose();
    navigateCompareWithScenario(loadTestResultId);
  };

  return (
    <BaseMenu menu={menu} setMenu={setMenu} icon={<CompareArrowsIcon />}>
      <BaseMenuItem
        icon={<CompareArrowsIcon />}
        title={'Show comparison with results'}
        onClick={onCompareWithResults}
      />
      <BaseMenuItem
        icon={<CompareArrowsIcon />}
        title={'Show comparison with averages'}
        onClick={onCompareWithAverages}
      />
      <BaseMenuItem
        icon={<CompareArrowsIcon />}
        title={'Show comparison with scenario'}
        onClick={onCompareWithScenario}
      />
    </BaseMenu>
  );
};
