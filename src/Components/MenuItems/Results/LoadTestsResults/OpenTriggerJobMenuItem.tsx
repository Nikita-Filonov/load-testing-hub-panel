import { BaseMenuItem } from '../../../Menus/BaseMenuItem';
import { FC } from 'react';
import { ShortLoadTestResult } from '../../../../Models/Results/LoadTestResults';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';

type OpenTriggerJobMenuItemProps = {
  result: ShortLoadTestResult;
  onClose: () => void;
};

export const OpenTriggerJobMenuItem: FC<OpenTriggerJobMenuItemProps> = (props) => {
  const { result, onClose } = props;

  const onOpenTriggerPipeline = () => {
    onClose();
    if (result.triggerCIJobUrl) {
      window.open(result.triggerCIJobUrl, '_blank');
    }
  };

  return (
    <BaseMenuItem
      icon={<BuildCircleOutlinedIcon />}
      title={'Open trigger job'}
      onClick={onOpenTriggerPipeline}
      disabled={!result.triggerCIJobUrl}
    />
  );
};
