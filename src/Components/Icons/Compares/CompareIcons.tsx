import { FC } from 'react';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

type CompareIconsProps = {
  compare: number;
};

export const CompareIcons: FC<CompareIconsProps> = ({ compare }) => {
  if (compare === 0) return <HorizontalRuleIcon sx={{ ml: 1.5 }} color={'warning'} />;

  if (compare < 0) return <KeyboardDoubleArrowDownIcon sx={{ ml: 1.5 }} color={'error'} />;

  if (compare > 0) return <KeyboardDoubleArrowUpIcon sx={{ ml: 1.5 }} color={'success'} />;

  return null;
};
