import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { BaseMenuItem } from '../Menus/BaseMenuItem';
import { FC } from 'react';

type EditMenuItemProps = {
  onEdit: () => void;
};

export const EditMenuItem: FC<EditMenuItemProps> = ({ onEdit }) => {
  return <BaseMenuItem icon={<EditOutlinedIcon />} title={'Edit'} onClick={onEdit} />;
};
