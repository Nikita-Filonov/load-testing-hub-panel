import { FC, useState } from 'react';
import { BaseMenu } from '../BaseMenu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { EditMenuItem } from '../../MenuItems/EditMenuItem';
import { DeleteMenuItem } from '../../MenuItems/DeleteMenuItem';

type ScenarioMethodSettingsListItemMenuProps = {
  onDeleteSettings: () => void;
  onUpdateSettings: () => void;
};

export const ScenarioMethodSettingsListItemMenu: FC<ScenarioMethodSettingsListItemMenuProps> = (props) => {
  const { onUpdateSettings, onDeleteSettings } = props;
  const [menu, setMenu] = useState<null | HTMLElement>(null);

  const onClose = () => setMenu(null);

  const onEdit = () => {
    onClose();
    onUpdateSettings();
  };

  const onDelete = () => {
    onClose();
    onDeleteSettings();
  };

  return (
    <BaseMenu menu={menu} setMenu={setMenu} icon={<MoreVertIcon />}>
      <EditMenuItem onEdit={onEdit} />
      <DeleteMenuItem onDelete={onDelete} />
    </BaseMenu>
  );
};
