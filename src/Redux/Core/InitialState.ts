import { ThemeMode, ThemeSettings } from '../../Models/Core/Theme';
import { CoreTableSettings } from '../../Models/Core/TableSettings';
import { CoreChartSettings, CoreChartWidgetSettings } from '../../Models/Core/ChartSettings';
import { getDefaultCoreTableSettings } from '../../Services/Tables/Utils';
import { getDefaultCoreChartSettings, getDefaultCoreChartWidgetSettings } from '../../Services/Charts/Utils';
import { ValidationError } from '../../Services/Clients/Models';

export type CoreInitialState = {
  theme: ThemeSettings;
  tableSettings: CoreTableSettings;
  chartSettings: CoreChartSettings;
  validationErrors: Record<string, ValidationError[]>;
  chartWidgetSettings: CoreChartWidgetSettings;
};

export const INITIAL_CORE: CoreInitialState = {
  theme: { mode: ThemeMode.Light },
  tableSettings: getDefaultCoreTableSettings(),
  chartSettings: getDefaultCoreChartSettings(),
  validationErrors: {},
  chartWidgetSettings: getDefaultCoreChartWidgetSettings()
};
