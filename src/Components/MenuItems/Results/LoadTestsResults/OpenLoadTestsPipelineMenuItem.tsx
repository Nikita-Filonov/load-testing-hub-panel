import { BaseMenuItem } from '../../../Menus/BaseMenuItem';
import { FC } from 'react';
import CloudSyncOutlinedIcon from '@mui/icons-material/CloudSyncOutlined';
import { ShortLoadTestResult } from '../../../../Models/Results/LoadTestResults';

type OpenLoadTestsPipelineMenuItemProps = {
  result: ShortLoadTestResult;
  onClose: () => void;
};

export const OpenLoadTestsPipelineMenuItem: FC<OpenLoadTestsPipelineMenuItemProps> = (props) => {
  const { result, onClose } = props;

  const onOpenLoadTestsPipeline = () => {
    onClose();
    if (result.loadTestsCIPipelineUrl) {
      window.open(result.loadTestsCIPipelineUrl, '_blank');
    }
  };

  return (
    <BaseMenuItem
      icon={<CloudSyncOutlinedIcon />}
      title={'Open load tests pipeline'}
      onClick={onOpenLoadTestsPipeline}
      disabled={!result.loadTestsCIPipelineUrl}
    />
  );
};
