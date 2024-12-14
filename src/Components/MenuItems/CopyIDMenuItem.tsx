import { BaseMenuItem } from '../Menus/BaseMenuItem';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { FC } from 'react';

type CopyIDMenuItemProps = {
  onCopy: () => void;
};

export const CopyIDMenuItem: FC<CopyIDMenuItemProps> = ({ onCopy }) => {
  return <BaseMenuItem icon={<ContentCopyIcon />} label={'Copy identifier'} onClick={onCopy} />;
};
