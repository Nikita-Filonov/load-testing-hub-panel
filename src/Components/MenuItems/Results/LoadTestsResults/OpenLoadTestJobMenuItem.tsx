import { BaseMenuItem } from '../../../Menus/BaseMenuItem';
import { FC } from 'react';
import { ShortLoadTestResult } from '../../../../Models/Results/LoadTestResults';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';

type OpenLoadTestJobMenuItemProps = {
  result: ShortLoadTestResult;
  onClose: () => void;
};

export const OpenLoadTestJobMenuItem: FC<OpenLoadTestJobMenuItemProps> = (props) => {
  const { result, onClose } = props;

  const onOpenLoadTestsJob = () => {
    onClose();
    if (result.loadTestsCIJobUrl) {
      window.open(result.loadTestsCIJobUrl, '_blank');
    }
  };

  return (
    <BaseMenuItem
      icon={<BuildCircleOutlinedIcon />}
      title={'Open load tests job'}
      onClick={onOpenLoadTestsJob}
      disabled={!result.loadTestsCIJobUrl}
    />
  );
};
