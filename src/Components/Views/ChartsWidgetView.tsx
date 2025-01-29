import React, { Fragment, ReactNode, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { EmptyView } from './EmptyView';
import { ChartWidgetSettingsMenu } from '../Menus/Core/ChartWidgetSettingsMenu';
import { ReduxState } from '../../Redux/ReduxState';
import { ChartWidgetSettings, ChartWidgetType } from '../../Models/Core/ChartSettings';
import { WidgetView, WidgetViewProps } from './WidgetView';
import { filterEnabledChartWidgetDisplaySettings } from '../../Services/Charts/Utils';

type GetChartViewProps<Extra> = { title: string } & Extra;

export type MapKeyToChartViewProps<Keys, Extra> = Record<keyof Keys, (props: GetChartViewProps<Extra>) => ReactNode>;

type Props<Keys, Extra> = {
  type: ChartWidgetType;
  title: string;
  extra: Extra;
  views: MapKeyToChartViewProps<Keys, Extra>;
} & Pick<WidgetViewProps, 'allowClose' | 'defaultClose'>;

export const ChartsWidgetView = <Keys, Extra>(props: Props<Keys, Extra>) => {
  const { type, title, extra, views, allowClose, defaultClose } = props;

  const settings = useSelector(
    (state: ReduxState) => state.core.chartWidgetSettings[type] as ChartWidgetSettings<Keys>
  );

  const charts = useMemo(() => settings.charts.filter(filterEnabledChartWidgetDisplaySettings), [settings.charts]);

  return (
    <WidgetView
      sx={{ mt: 3 }}
      title={title}
      actions={[{ content: <ChartWidgetSettingsMenu type={type} /> }]}
      allowClose={allowClose}
      defaultClose={defaultClose}>
      {charts.length === 0 && (
        <EmptyView
          title={'There is no charts to display'}
          description={'Click on the gear icon in the top-right corner to select comparison charts'}
          containerSx={{ mt: 5, mb: 5 }}
        />
      )}
      {charts.map((chart) => (
        <Fragment key={chart.index}>{views?.[chart.key]({ title: chart.title, ...extra })}</Fragment>
      ))}
    </WidgetView>
  );
};
