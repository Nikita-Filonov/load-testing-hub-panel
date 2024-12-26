import { BaseMenuItem } from '../Menus/BaseMenuItem';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { FC } from 'react';

type ViewDetailsMenuItemProps = {
  onDetails: () => void;
};

export const ViewDetailsMenuItem: FC<ViewDetailsMenuItemProps> = ({ onDetails }) => {
  return <BaseMenuItem icon={<ArticleOutlinedIcon />} title={'View details'} onClick={onDetails} />;
};
