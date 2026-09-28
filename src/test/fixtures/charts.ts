import { ChartWidgetSettings, ChartWidgetType } from '../../Models/Core/ChartSettings';
import { setChartWidgetSettings } from '../../Redux/Core/Slice';
import { createAppStore } from '../../Redux/Store';

export const enableAllWidgetCharts = (store: ReturnType<typeof createAppStore>, type: ChartWidgetType) => {
  const settings = store.getState().core.chartWidgetSettings[type];
  store.dispatch(setChartWidgetSettings({
    type,
    settings: { charts: settings.charts.map((chart) => ({ ...chart, enabled: true })) } as ChartWidgetSettings<unknown>
  }));
};
