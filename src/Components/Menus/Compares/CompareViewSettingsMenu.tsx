import { BaseMenu } from '../BaseMenu';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useMemo, useState } from 'react';
import { CompareTableSettings } from '../../../Models/Compares/CompareTableSettings';
import { filterEnabledCompareTableRowSettings, sortCompareTableRowSettings } from '../../../Services/Compares/Utils';
import { BaseCompare } from '../../../Models/Compares/Compares';
import { CompareViewRowSettingsMenuItem } from '../../MenuItems/Compares/CompareViewRowSettingsMenuItem';

type CompareViewSettingsMenuProps<T extends BaseCompare> = {
  tableSettings: CompareTableSettings<T>;
  setTableSettings: (settings: CompareTableSettings<T>) => void;
};

export const CompareViewSettingsMenu = <T extends BaseCompare>(props: CompareViewSettingsMenuProps<T>) => {
  const { tableSettings, setTableSettings } = props;
  const [menu, setMenu] = useState<null | HTMLElement>(null);

  const rows = useMemo(() => [...tableSettings.rows].sort(sortCompareTableRowSettings), [tableSettings.rows]);

  const enabledRows = useMemo(() => rows.filter(filterEnabledCompareTableRowSettings), [rows]);

  const setRowEnabled = (rowIndex: number) => (enabled: boolean) => {
    const rows = tableSettings.rows.map((row) => (row.index === rowIndex ? { ...row, enabled } : row));

    setTableSettings({ ...tableSettings, rows });
  };

  return (
    <BaseMenu
      menu={menu}
      setMenu={setMenu}
      icon={<SettingsOutlinedIcon fontSize={'small'} />}
      buttonSize={'small'}
      badgeContent={enabledRows.length}>
      {rows.map((row) => (
        <CompareViewRowSettingsMenuItem key={row.index} row={row} setRowEnabled={setRowEnabled(row.index)} />
      ))}
    </BaseMenu>
  );
};
