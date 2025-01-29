import { FC } from 'react';
import { BaseListMenuItem } from '../Menus/BaseListMenuItem';
import { BaseSwitch } from '../Switches/BaseSwitch';

type SwitchMenuItemProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export const SwitchMenuItem: FC<SwitchMenuItemProps> = (props) => {
  const { label, checked, onChange } = props;

  const onUpdate = () => onChange(!checked);

  return (
    <BaseListMenuItem
      label={label}
      onClick={onUpdate}
      secondaryAction={<BaseSwitch checked={checked} onChange={onChange} />}
    />
  );
};
