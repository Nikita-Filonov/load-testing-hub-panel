import { FC, useState } from 'react';
import { BaseMenu } from '../../BaseMenu';
import { BaseMenuItem } from '../../BaseMenuItem';
import AddLinkIcon from '@mui/icons-material/AddLink';
import { LoadTestResultDetails } from '../../../../Models/Results/LoadTestResults';
import UndoIcon from '@mui/icons-material/Undo';
import { OpenTriggerPipelineMenuItem } from '../../../MenuItems/Results/LoadTestsResults/OpenTriggerPipelineMenuItem';
import { OpenLoadTestsPipelineMenuItem } from '../../../MenuItems/Results/LoadTestsResults/OpenLoadTestsPipelineMenuItem';
import { OpenTriggerJobMenuItem } from '../../../MenuItems/Results/LoadTestsResults/OpenTriggerJobMenuItem';
import { OpenLoadTestJobMenuItem } from '../../../MenuItems/Results/LoadTestsResults/OpenLoadTestJobMenuItem';
import { useLoadTestResultsNavigation } from '../../../../Services/Results/Hooks';

type LoadTestsResultsTriggersMenuProps = {
  details: LoadTestResultDetails;
};

export const LoadTestsResultsTriggersMenu: FC<LoadTestsResultsTriggersMenuProps> = (props) => {
  const { details } = props;
  const { getLoadTestResultDetailsURL } = useLoadTestResultsNavigation();
  const [menu, setMenu] = useState<null | HTMLElement>(null);

  const onClose = () => setMenu(null);

  const onViewPreviousResult = () => {
    onClose();
    if (details.compare?.previousId) {
      window.open(getLoadTestResultDetailsURL(details.compare?.previousId), '_blank');
    }
  };

  return (
    <BaseMenu menu={menu} setMenu={setMenu} icon={<AddLinkIcon />}>
      <BaseMenuItem
        icon={<UndoIcon />}
        title={'View previous result'}
        onClick={onViewPreviousResult}
        disabled={!details.compare?.previousId}
      />
      <OpenTriggerJobMenuItem result={details} onClose={onClose} />
      <OpenLoadTestJobMenuItem result={details} onClose={onClose} />
      <OpenTriggerPipelineMenuItem result={details} onClose={onClose} />
      <OpenLoadTestsPipelineMenuItem result={details} onClose={onClose} />
    </BaseMenu>
  );
};
