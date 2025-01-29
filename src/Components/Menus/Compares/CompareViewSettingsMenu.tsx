import { useMemo } from 'react';
import { CompareTableSettings } from '../../../Models/Compares/CompareTableSettings';
import { filterEnabledCompareTableRowSettings, sortCompareTableRowSettings } from '../../../Services/Compares/Utils';
import { BaseCompare } from '../../../Models/Compares/Compares';
import { SwitchMenuItem } from '../../MenuItems/SwitchMenuItem';
import { SettingsMenu } from '../SettingsMenu';

type CompareViewSettingsMenuProps<T extends BaseCompare> = {
  tableSettings: CompareTableSettings<T>;
  setTableSettings: (settings: CompareTableSettings<T>) => void;
};

export const CompareViewSettingsMenu = <T extends BaseCompare>(props: CompareViewSettingsMenuProps<T>) => {
  const { tableSettings, setTableSettings } = props;

  const rows = useMemo(() => [...tableSettings.rows].sort(sortCompareTableRowSettings), [tableSettings.rows]);

  const enabledRows = useMemo(() => rows.filter(filterEnabledCompareTableRowSettings), [rows]);

  const setRowEnabled = (rowIndex: number) => (enabled: boolean) => {
    const rows = tableSettings.rows.map((row) => (row.index === rowIndex ? { ...row, enabled } : row));

    setTableSettings({ ...tableSettings, rows });
  };

  return (
    <SettingsMenu badgeContent={enabledRows.length}>
      {rows.map((row) => (
        <SwitchMenuItem
          key={row.index}
          label={row.metricName}
          checked={row.enabled}
          onChange={setRowEnabled(row.index)}
        />
      ))}
    </SettingsMenu>
  );
};
