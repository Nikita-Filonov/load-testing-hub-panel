import { FC, useState } from 'react';
import { BaseMenu } from '../../BaseMenu';
import { LoadTestResult } from '../../../../Models/Results/LoadTestResults';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { OpenTriggerPipelineMenuItem } from '../../../MenuItems/Results/LoadTestsResults/OpenTriggerPipelineMenuItem';
import { OpenLoadTestsPipelineMenuItem } from '../../../MenuItems/Results/LoadTestsResults/OpenLoadTestsPipelineMenuItem';
import { ViewDetailsMenuItem } from '../../../MenuItems/ViewDetailsMenuItem';
import { OpenLoadTestJobMenuItem } from '../../../MenuItems/Results/LoadTestsResults/OpenLoadTestJobMenuItem';
import { OpenTriggerJobMenuItem } from '../../../MenuItems/Results/LoadTestsResults/OpenTriggerJobMenuItem';
import { useLoadTestResultsNavigation } from '../../../../Services/Results/Hooks';

type LoadTestResultListItemMenuProps = {
  result: LoadTestResult;
};

export const LoadTestResultListItemMenu: FC<LoadTestResultListItemMenuProps> = ({ result }) => {
  const { getLoadTestResultDetailsURL } = useLoadTestResultsNavigation();
  const [menu, setMenu] = useState<null | HTMLElement>(null);

  const onClose = () => setMenu(null);

  const onViewDetails = () => {
    onClose();
    window.open(getLoadTestResultDetailsURL(result.id), '_blank');
  };

  return (
    <BaseMenu menu={menu} setMenu={setMenu} icon={<MoreVertIcon fontSize={'small'} />}>
      <ViewDetailsMenuItem onDetails={onViewDetails} />
      <OpenTriggerJobMenuItem result={result} onClose={onClose} />
      <OpenLoadTestJobMenuItem result={result} onClose={onClose} />
      <OpenTriggerPipelineMenuItem result={result} onClose={onClose} />
      <OpenLoadTestsPipelineMenuItem result={result} onClose={onClose} />
    </BaseMenu>
  );
};
