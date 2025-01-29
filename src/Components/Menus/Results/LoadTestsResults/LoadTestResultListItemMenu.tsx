import { useState } from 'react';
import { BaseMenu } from '../../BaseMenu';
import { ShortLoadTestResult } from '../../../../Models/Results/LoadTestResults';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { OpenTriggerPipelineMenuItem } from '../../../MenuItems/Results/LoadTestsResults/OpenTriggerPipelineMenuItem';
import { OpenLoadTestsPipelineMenuItem } from '../../../MenuItems/Results/LoadTestsResults/OpenLoadTestsPipelineMenuItem';
import { ViewDetailsMenuItem } from '../../../MenuItems/ViewDetailsMenuItem';
import { OpenLoadTestJobMenuItem } from '../../../MenuItems/Results/LoadTestsResults/OpenLoadTestJobMenuItem';
import { OpenTriggerJobMenuItem } from '../../../MenuItems/Results/LoadTestsResults/OpenTriggerJobMenuItem';
import { useLoadTestResultsNavigation } from '../../../../Services/Results/Hooks';
import { ViewScenarioDetailsMenuItem } from '../../../MenuItems/ViewScenarioDetailsMenuItem';
import { CopyDetailsURLMenuItem } from '../../../MenuItems/CopyDetailsURLMenuItem';

type LoadTestResultListItemMenuProps<T extends ShortLoadTestResult> = {
  result: T;
  onScenarioDetails: (result: T) => void;
};

export const LoadTestResultListItemMenu = <T extends ShortLoadTestResult>(
  props: LoadTestResultListItemMenuProps<T>
) => {
  const { result, onScenarioDetails } = props;
  const { getLoadTestResultDetailsURL } = useLoadTestResultsNavigation();
  const [menu, setMenu] = useState<null | HTMLElement>(null);

  const onClose = () => setMenu(null);

  const onViewDetails = () => {
    onClose();
    window.open(getLoadTestResultDetailsURL(result.id), '_blank');
  };

  const onCopyDetailsURL = async () => {
    onClose();
    await navigator.clipboard.writeText(getLoadTestResultDetailsURL(result.id));
  };

  const onViewScenario = () => {
    onClose();
    onScenarioDetails(result);
  };

  return (
    <BaseMenu menu={menu} setMenu={setMenu} icon={<MoreVertIcon fontSize={'small'} />} buttonSize={'small'}>
      <ViewDetailsMenuItem onDetails={onViewDetails} />
      <CopyDetailsURLMenuItem onCopy={onCopyDetailsURL} />
      <ViewScenarioDetailsMenuItem onDetails={onViewScenario} />
      <OpenTriggerJobMenuItem result={result} onClose={onClose} />
      <OpenLoadTestJobMenuItem result={result} onClose={onClose} />
      <OpenTriggerPipelineMenuItem result={result} onClose={onClose} />
      <OpenLoadTestsPipelineMenuItem result={result} onClose={onClose} />
    </BaseMenu>
  );
};
