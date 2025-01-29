import { FC, useMemo } from 'react';
import { SwitchMenuItem } from '../../MenuItems/SwitchMenuItem';
import { TableSettings, TableType } from '../../../Models/Core/TableSettings';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { setTableSettings } from '../../../Redux/Core/Slice';
import { filterVisibleHeaderSettings, sortHeaderSettings } from '../../../Services/Tables/Utils';
import { SettingsMenu } from '../SettingsMenu';

type TableSettingsMenuProps = {
  type: TableType;
};

export const TableSettingsMenu: FC<TableSettingsMenuProps> = (props) => {
  const { type } = props;
  const dispatch = useDispatch();

  const settings = useSelector((state: ReduxState) => state.core.tableSettings[type] as TableSettings<unknown>);

  const headers = useMemo(() => [...settings.headers].sort(sortHeaderSettings), [settings.headers]);

  const enabledHeaders = useMemo(() => headers.filter(filterVisibleHeaderSettings), [headers]);

  const setHeaderHidden = (index: number) => (hidden: boolean) => {
    const rows = settings.rows.map((row) => (row.index === index ? { ...row, hidden: !hidden } : row));
    const headers = settings.headers.map((header) =>
      header.index === index ? { ...header, hidden: !hidden } : header
    );

    dispatch(setTableSettings({ type, settings: { ...settings, rows, headers } }));
  };

  return (
    <SettingsMenu badgeContent={enabledHeaders.length}>
      {headers.map((header, index) => (
        <SwitchMenuItem
          key={index}
          label={header.value}
          checked={!header.hidden}
          onChange={setHeaderHidden(header.index)}
        />
      ))}
    </SettingsMenu>
  );
};
