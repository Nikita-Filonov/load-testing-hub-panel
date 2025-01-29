import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import { FC } from 'react';
import { BaseMenuItem } from '../Menus/BaseMenuItem';

type SetCommentMenuItemProps = {
  onComment: () => void;
};

export const SetCommentMenuItem: FC<SetCommentMenuItemProps> = ({ onComment }) => {
  return <BaseMenuItem icon={<CommentOutlinedIcon />} title={'Set comment'} onClick={onComment} />;
};
