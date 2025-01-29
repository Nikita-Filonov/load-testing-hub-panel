import { FC, useMemo } from 'react';
import { SwitchMenuItem } from '../../MenuItems/SwitchMenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { setChartWidgetSettings } from '../../../Redux/Core/Slice';
import {
  filterEnabledChartWidgetDisplaySettings,
  sortChartWidgetDisplaySettings
} from '../../../Services/Charts/Utils';
import { ChartWidgetSettings, ChartWidgetType } from '../../../Models/Core/ChartSettings';
import { SettingsMenu } from '../SettingsMenu';

type ChartWidgetSettingsMenuProps = {
  type: ChartWidgetType;
};

export const ChartWidgetSettingsMenu: FC<ChartWidgetSettingsMenuProps> = (props) => {
  const { type } = props;
  const dispatch = useDispatch();

  const settings = useSelector(
    (state: ReduxState) => state.core.chartWidgetSettings[type] as ChartWidgetSettings<unknown>
  );

  const charts = useMemo(() => [...settings.charts].sort(sortChartWidgetDisplaySettings), [settings.charts]);

  const enabledCharts = useMemo(() => charts.filter(filterEnabledChartWidgetDisplaySettings), [charts]);

  const setChartEnabled = (index: number) => (enabled: boolean) => {
    const charts = settings.charts.map((chart) => (chart.index === index ? { ...chart, enabled } : chart));

    dispatch(setChartWidgetSettings({ type, settings: { ...settings, charts } }));
  };

  return (
    <SettingsMenu badgeContent={enabledCharts.length}>
      {charts.map((chart, index) => (
        <SwitchMenuItem
          key={index}
          label={chart.title}
          checked={chart.enabled}
          onChange={setChartEnabled(chart.index)}
        />
      ))}
    </SettingsMenu>
  );
};
