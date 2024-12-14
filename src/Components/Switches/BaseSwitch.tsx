import { Switch } from '@mui/material';
import { ChangeEvent, FC } from 'react';

type BaseSwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export const BaseSwitch: FC<BaseSwitchProps> = ({ checked, onChange }) => {
  const onInternalChange = (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.checked);

  return <Switch edge={'end'} size={'small'} checked={checked} onChange={onInternalChange} />;
};
