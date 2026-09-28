import { expect, it } from 'vitest';
import { fireEvent, screen, within } from '@testing-library/react';
import { renderWithStore } from '../../test/fixtures/render';
import { TableSettingsMenu } from './Core/TableSettingsMenu';
import { ChartSettingsMenu } from './Core/ChartSettingsMenu';
import { ChartWidgetSettingsMenu } from './Core/ChartWidgetSettingsMenu';
import { TableType } from '../../Models/Core/TableSettings';
import { ChartType, ChartWidgetType } from '../../Models/Core/ChartSettings';

it('hides and restores a table column in both headers and rows', () => {
  const { store } = renderWithStore(<TableSettingsMenu type={TableType.ExceptionResultsTable} />);
  const current = store.getState().core.tableSettings[TableType.ExceptionResultsTable];
  expect(current.headers[0].hidden).toBe(false);
  fireEvent.click(screen.getByTestId('SettingsOutlinedIcon').closest('button')!);
  fireEvent.click(within(screen.getByRole('menu')).getByText('Number of exceptions'));
  expect(store.getState().core.tableSettings[TableType.ExceptionResultsTable].headers[0].hidden).toBe(true);
  expect(store.getState().core.tableSettings[TableType.ExceptionResultsTable].rows[0].hidden).toBe(true);
  fireEvent.click(within(screen.getByRole('menu')).getByText('Number of exceptions'));
  expect(store.getState().core.tableSettings[TableType.ExceptionResultsTable].headers[0].hidden).toBe(false);
});

it('toggles a chart axis while keeping the other axes in place', () => {
  const type = ChartType.MethodResponseTimesBarChart;
  const { store } = renderWithStore(<ChartSettingsMenu type={type} />);
  const before = store.getState().core.chartSettings[type].yAxis;
  const first = before[0];
  fireEvent.click(screen.getByTestId('SettingsOutlinedIcon').closest('button')!);
  fireEvent.click(within(screen.getByRole('menu')).getByText(first.label));
  const axes = store.getState().core.chartSettings[type].yAxis;
  expect(axes[0].enabled).toBe(!first.enabled);
  expect(axes.slice(1)).toEqual(before.slice(1));
});

it('enables another dashboard chart without changing existing selections', () => {
  const type = ChartWidgetType.DashboardMethodsCharts;
  const { store } = renderWithStore(<ChartWidgetSettingsMenu type={type} />);
  const before = store.getState().core.chartWidgetSettings[type].charts;
  const disabled = before.find((chart) => !chart.enabled)!;
  fireEvent.click(screen.getByTestId('SettingsOutlinedIcon').closest('button')!);
  fireEvent.click(within(screen.getByRole('menu')).getByText(disabled.title));
  const after = store.getState().core.chartWidgetSettings[type].charts;
  expect(after.find((chart) => chart.index === disabled.index)?.enabled).toBe(true);
  expect(after.filter((chart) => chart.enabled)).toHaveLength(before.filter((chart) => chart.enabled).length + 1);
});
