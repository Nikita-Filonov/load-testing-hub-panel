import { FC, useMemo } from 'react';
import { SwitchMenuItem } from '../../MenuItems/SwitchMenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { setChartSettings } from '../../../Redux/Core/Slice';
import { filterEnabledYAxisSettings, sortYAxisSettings } from '../../../Services/Charts/Utils';
import { ChartSettings, ChartType } from '../../../Models/Core/ChartSettings';
import { SettingsMenu } from '../SettingsMenu';

type ChartSettingsMenuProps = {
  type: ChartType;
};

export const ChartSettingsMenu: FC<ChartSettingsMenuProps> = (props) => {
  const { type } = props;
  const dispatch = useDispatch();

  const settings = useSelector((state: ReduxState) => state.core.chartSettings[type] as ChartSettings<unknown>);

  const yAxis = useMemo(() => [...settings.yAxis].sort(sortYAxisSettings), [settings.yAxis]);

  const enabledYAxis = useMemo(() => yAxis.filter(filterEnabledYAxisSettings), [yAxis]);

  const setAxisEnabled = (index: number) => (enabled: boolean) => {
    const yAxis = settings.yAxis.map((axis) => (axis.index === index ? { ...axis, enabled } : axis));

    dispatch(setChartSettings({ type, settings: { ...settings, yAxis } }));
  };

  return (
    <SettingsMenu badgeContent={enabledYAxis.length}>
      {yAxis.map((axis, index) => (
        <SwitchMenuItem key={index} label={axis.label} checked={axis.enabled} onChange={setAxisEnabled(axis.index)} />
      ))}
    </SettingsMenu>
  );
};
