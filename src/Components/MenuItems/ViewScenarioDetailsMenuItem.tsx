import { BaseMenuItem } from '../Menus/BaseMenuItem';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import { FC } from 'react';

type ViewScenarioDetailsMenuItemProps = {
  onDetails: () => void;
};

export const ViewScenarioDetailsMenuItem: FC<ViewScenarioDetailsMenuItemProps> = ({ onDetails }) => {
  return <BaseMenuItem icon={<HandymanOutlinedIcon />} title={'View scenario details'} onClick={onDetails} />;
};
