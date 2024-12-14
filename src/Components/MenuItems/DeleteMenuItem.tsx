import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { BaseMenuItem } from '../Menus/BaseMenuItem';
import { FC } from 'react';

type DeleteMenuItemProps = {
  onDelete: () => void;
};

export const DeleteMenuItem: FC<DeleteMenuItemProps> = ({ onDelete }) => {
  return <BaseMenuItem icon={<DeleteOutlinedIcon />} label={'Delete'} onClick={onDelete} />;
};
