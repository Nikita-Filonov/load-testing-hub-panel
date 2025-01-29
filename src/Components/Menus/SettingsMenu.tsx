import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { FC, useState } from 'react';
import { BaseMenu, BaseMenuProps } from './BaseMenu';

type SettingsMenuProps = Omit<BaseMenuProps, 'menu' | 'setMenu' | 'icon' | 'buttonSize'>;

export const SettingsMenu: FC<SettingsMenuProps> = (props) => {
  const [menu, setMenu] = useState<null | HTMLElement>(null);

  return (
    <BaseMenu
      menu={menu}
      setMenu={setMenu}
      icon={<SettingsOutlinedIcon fontSize={'small'} />}
      buttonSize={'small'}
      {...props}>
      {props.children}
    </BaseMenu>
  );
};
