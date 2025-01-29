import { BaseMenuItem } from '../../../Menus/BaseMenuItem';
import { FC } from 'react';
import CloudSyncOutlinedIcon from '@mui/icons-material/CloudSyncOutlined';
import { ShortLoadTestResult } from '../../../../Models/Results/LoadTestResults';

type OpenTriggerPipelineMenuItemProps = {
  result: ShortLoadTestResult;
  onClose: () => void;
};

export const OpenTriggerPipelineMenuItem: FC<OpenTriggerPipelineMenuItemProps> = (props) => {
  const { result, onClose } = props;

  const onOpenTriggerPipeline = () => {
    onClose();
    if (result.triggerCIPipelineUrl) {
      window.open(result.triggerCIPipelineUrl, '_blank');
    }
  };

  return (
    <BaseMenuItem
      icon={<CloudSyncOutlinedIcon />}
      title={'Open trigger pipeline'}
      onClick={onOpenTriggerPipeline}
      disabled={!result.triggerCIPipelineUrl}
    />
  );
};
