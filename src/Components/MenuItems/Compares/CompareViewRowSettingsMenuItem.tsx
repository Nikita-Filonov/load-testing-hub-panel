import { BaseSwitch } from '../../Switches/BaseSwitch';
import { BaseListMenuItem } from '../../Menus/BaseListMenuItem';
import { CompareTableRowSettings } from '../../../Models/Compares/CompareTableSettings';
import { BaseCompare } from '../../../Models/Compares/Compares';

type CompareViewRowSettingsMenuItemProps<T extends BaseCompare> = {
  row: CompareTableRowSettings<T>;
  setRowEnabled: (enabled: boolean) => void;
};

export const CompareViewRowSettingsMenuItem = <T extends BaseCompare>(
  props: CompareViewRowSettingsMenuItemProps<T>
) => {
  const { row, setRowEnabled } = props;

  const onUpdate = () => setRowEnabled(!row.enabled);

  return (
    <BaseListMenuItem
      label={row.metricName}
      onClick={onUpdate}
      secondaryAction={<BaseSwitch checked={row.enabled} onChange={setRowEnabled} />}
    />
  );
};
