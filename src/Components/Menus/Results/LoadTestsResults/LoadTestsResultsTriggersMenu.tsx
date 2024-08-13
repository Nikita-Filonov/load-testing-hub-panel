import { FC, useState } from 'react';
import { BaseMenu } from '../../BaseMenu';
import { BaseMenuItem } from '../../BaseMenuItem';
import AddLinkIcon from '@mui/icons-material/AddLink';
import { LoadTestResultDetails } from '../../../../Models/Results/LoadTestResults';
import { formatRouteTemplate } from '../../../../Services/HookServices/AppNavigationServiceHook';
import { AppRoutes } from '../../../../Services/Constants/Routing';
import UndoIcon from '@mui/icons-material/Undo';
import CloudSyncOutlinedIcon from '@mui/icons-material/CloudSyncOutlined';

type LoadTestsResultsTriggersMenuProps = {
  details: LoadTestResultDetails;
};

export const LoadTestsResultsTriggersMenu: FC<LoadTestsResultsTriggersMenuProps> = (props) => {
  const { details } = props;
  const [menu, setMenu] = useState<null | HTMLElement>(null);

  const onClose = () => setMenu(null);

  const onViewPreviousResult = () => {
    onClose();
    if (details.compare?.previousId) {
      const url = formatRouteTemplate(AppRoutes.ResultDetails, { loadTestResultId: details.compare?.previousId });
      window.open(url, '_blank');
    }
  };

  const onOpenTriggerPipeline = () => {
    onClose();
    details.triggerCIPipelineUrl && window.open(details.triggerCIPipelineUrl, '_blank');
  };

  const onOpenLoadTestsPipeline = () => {
    onClose();
    details.loadTestsCIPipelineUrl && window.open(details.loadTestsCIPipelineUrl, '_blank');
  };

  return (
    <BaseMenu menu={menu} setMenu={setMenu} icon={<AddLinkIcon />}>
      <BaseMenuItem
        icon={<UndoIcon />}
        label={'View previous result'}
        onClick={onViewPreviousResult}
        disabled={!details.compare?.previousId}
      />
      <BaseMenuItem
        icon={<CloudSyncOutlinedIcon />}
        label={'Open trigger pipeline'}
        onClick={onOpenTriggerPipeline}
        disabled={!details.triggerCIPipelineUrl}
      />
      <BaseMenuItem
        icon={<CloudSyncOutlinedIcon />}
        label={'Open load tests pipeline'}
        onClick={onOpenLoadTestsPipeline}
        disabled={!details.loadTestsCIPipelineUrl}
      />
    </BaseMenu>
  );
};
