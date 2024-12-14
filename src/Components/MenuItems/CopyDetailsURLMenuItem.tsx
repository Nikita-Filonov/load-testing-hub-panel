import LinkIcon from '@mui/icons-material/Link';
import { BaseMenuItem } from '../Menus/BaseMenuItem';
import { FC } from 'react';

type CopyDetailsURLMenuItemProps = {
  onCopy: () => void;
};

export const CopyDetailsURLMenuItem: FC<CopyDetailsURLMenuItemProps> = ({ onCopy }) => {
  return <BaseMenuItem icon={<LinkIcon />} label={'Copy details URL'} onClick={onCopy} />;
};
