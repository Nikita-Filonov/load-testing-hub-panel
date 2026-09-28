import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import { createAppStore } from './Store';
import { ReduxState } from './ReduxState';
import { RehydrationGate } from '../Providers/RehydrationGate';
import { createStorageFixture, encodeLegacyState } from '../test/fixtures/storage';
import { INITIAL_CORE } from './Core/InitialState';
import { INITIAL_SERVICES } from './Services/Services/InitialState';
import { INITIAL_SCENARIOS } from './Services/Scenarios/InitialState';
import { INITIAL_COMPARE_SETTINGS } from './Compares/CompareSettings/InitialState';
import { ThemeMode } from '../Models/Core/Theme';
import { ChartType } from '../Models/Core/ChartSettings';
import { CompareWidgetType } from '../Models/Compares/CompareTableSettings';
import { setTheme, setValidationErrors } from './Core/Slice';
import { clearServicesState, setService, setServices } from './Services/Services/Slice';
import { setScenario } from './Services/Scenarios/Slice';
import { setCompareSettings, setCompareWidgetSettings } from './Compares/CompareSettings/CompareSettingsSlice';

beforeEach(() => vi.useFakeTimers());
afterEach(async () => {
  await vi.runAllTimersAsync();
  vi.useRealTimers();
});

const service = { ...INITIAL_SERVICES.service, id: 7, name: 'Checkout' };
const scenario = { ...INITIAL_SCENARIOS.scenario, id: 11, name: 'Baseline' };

describe('Redux Remember persistence', () => {
  it('starts with defaults and completes rehydration on first use', async () => {
    const { driver } = createStorageFixture();
    const store = createAppStore(driver);

    expect(store.getState().rehydrated).toBe(false);
    await vi.runAllTimersAsync();

    expect(store.getState().rehydrated).toBe(true);
    expect(store.getState().core).toEqual(INITIAL_CORE);
    expect(store.getState().services).toEqual(INITIAL_SERVICES);
  });

  it('persists and restores preferences through native localStorage', async () => {
    localStorage.clear();
    try {
      const store = createAppStore();
      await vi.runAllTimersAsync();
      store.dispatch(setTheme({ mode: ThemeMode.Dark }));
      await vi.runAllTimersAsync();

      expect(JSON.parse(localStorage.getItem('persist:core')!)).toMatchObject({
        version: 1,
        state: { theme: { mode: ThemeMode.Dark } }
      });
      const reloaded = createAppStore();
      await vi.runAllTimersAsync();
      expect(reloaded.getState().core.theme.mode).toBe(ThemeMode.Dark);
      expect(reloaded.getState().rehydrated).toBe(true);
    } finally {
      localStorage.clear();
    }
  });

  it('restores all legacy preferences and rewrites them in the new format', async () => {
    const core = structuredClone(INITIAL_CORE);
    core.theme.mode = ThemeMode.Dark;
    core.chartSettings[ChartType.DashboardNumberOfRequestsBarChart].yAxis[0].enabled = false;
    const compareWidgetsSettings = structuredClone(INITIAL_COMPARE_SETTINGS.compareWidgetsSettings);
    compareWidgetsSettings[CompareWidgetType.CompareResultWithResults].methodResultCompareTable.rows[0].enabled = false;
    const { driver, entries } = createStorageFixture({
      'persist:core': encodeLegacyState(core),
      'persist:services': encodeLegacyState({ service }, -1),
      'persist:scenarios': encodeLegacyState({ scenario }, -1),
      'persist:compareSettings': encodeLegacyState({ compareWidgetsSettings })
    });
    const store = createAppStore(driver);
    await vi.runAllTimersAsync();

    expect(store.getState().core).toEqual(core);
    expect(store.getState().services).toEqual({ ...INITIAL_SERVICES, service });
    expect(store.getState().scenarios).toEqual({ ...INITIAL_SCENARIOS, scenario });
    expect(store.getState().compareSettings).toEqual({ ...INITIAL_COMPARE_SETTINGS, compareWidgetsSettings });

    store.dispatch(setTheme({ mode: ThemeMode.Light }));
    await vi.runAllTimersAsync();
    expect(JSON.parse(entries.get('persist:core')!)).toMatchObject({ version: 1, state: { theme: { mode: 'light' } } });

    const reloaded = createAppStore(driver);
    await vi.runAllTimersAsync();
    expect(reloaded.getState()).toEqual(store.getState());
  });

  it('persists selected fields while API data and validation errors reset on reload', async () => {
    const { driver, entries } = createStorageFixture();
    const store = createAppStore(driver);
    await vi.runAllTimersAsync();
    const settings = structuredClone(
      INITIAL_COMPARE_SETTINGS.compareWidgetsSettings[CompareWidgetType.CompareResultWithResults]
    );
    settings.methodResultCompareTable.rows[0].enabled = false;

    store.dispatch(setTheme({ mode: ThemeMode.Dark }));
    store.dispatch(setService(service));
    store.dispatch(setServices([service]));
    store.dispatch(setScenario(scenario));
    store.dispatch(setValidationErrors({ key: 'form', errors: [] }));
    store.dispatch(setCompareWidgetSettings({ type: CompareWidgetType.CompareResultWithResults, settings }));
    store.dispatch(setCompareSettings({ ...INITIAL_COMPARE_SETTINGS.compareSettings, serviceId: 7 }));
    await vi.runAllTimersAsync();

    expect([...entries.keys()].sort()).toEqual([
      'persist:compareSettings',
      'persist:core',
      'persist:scenarios',
      'persist:services'
    ]);
    expect(JSON.parse(entries.get('persist:services')!).state).toEqual({ service });
    expect(JSON.parse(entries.get('persist:core')!).state).not.toHaveProperty('validationErrors');
    expect(JSON.parse(entries.get('persist:compareSettings')!).state).not.toHaveProperty('compareSettings');

    const reloaded = createAppStore(driver);
    await vi.runAllTimersAsync();
    expect(reloaded.getState().core.theme.mode).toBe(ThemeMode.Dark);
    expect(reloaded.getState().core.validationErrors).toEqual({});
    expect(reloaded.getState().services).toEqual({ ...INITIAL_SERVICES, service });
    expect(reloaded.getState().scenarios.scenario).toEqual(scenario);
    expect(
      reloaded.getState().compareSettings.compareWidgetsSettings[CompareWidgetType.CompareResultWithResults]
    ).toEqual(settings);
    expect(reloaded.getState().compareSettings.compareSettings).toEqual(INITIAL_COMPARE_SETTINGS.compareSettings);

    reloaded.dispatch(clearServicesState());
    await vi.runAllTimersAsync();
    const cleared = createAppStore(driver);
    await vi.runAllTimersAsync();
    expect(cleared.getState().services).toEqual(INITIAL_SERVICES);
  });

  it('applies the previous version 1 migrations to legacy version 0 settings', async () => {
    const { driver } = createStorageFixture({
      'persist:core': encodeLegacyState(
        {
          theme: { mode: 'dark' },
          chartSettings: { obsolete: true },
          tableSettings: { obsolete: true },
          chartWidgetSettings: { obsolete: true }
        },
        0
      ),
      'persist:compareSettings': encodeLegacyState({ compareWidgetsSettings: { obsolete: true } }, 0)
    });
    const store = createAppStore(driver);
    await vi.runAllTimersAsync();

    expect(store.getState().core).toEqual({ ...INITIAL_CORE, theme: { mode: ThemeMode.Dark } });
    expect(store.getState().compareSettings).toEqual(INITIAL_COMPARE_SETTINGS);
  });

  it('recovers a corrupt slice without losing other saved preferences', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { driver } = createStorageFixture({
      'persist:core': '{invalid json',
      'persist:services': encodeLegacyState({ service })
    });
    const store = createAppStore(driver);
    await vi.runAllTimersAsync();

    expect(store.getState().rehydrated).toBe(true);
    expect(store.getState().core).toEqual(INITIAL_CORE);
    expect(store.getState().services.service).toEqual(service);
    expect(warn).toHaveBeenCalled();
  });

  it.each(['null', '[]', '{"version":1,"state":{"theme":"dark"}}'])
    ('recovers an invalid preference value: %s', async (saved) => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const { driver } = createStorageFixture({ 'persist:core': saved });
      const store = createAppStore(driver);
      await vi.runAllTimersAsync();
      expect(store.getState().core).toEqual(INITIAL_CORE);
      expect(store.getState().rehydrated).toBe(true);
      expect(warn).toHaveBeenCalled();
    });

  it('completes startup when reading storage fails', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { driver } = createStorageFixture();
    driver.getItem.mockImplementation(() => {
      throw new DOMException('Storage blocked', 'SecurityError');
    });
    const store = createAppStore(driver);
    await vi.runAllTimersAsync();

    expect(store.getState().rehydrated).toBe(true);
    expect(store.getState().core).toEqual(INITIAL_CORE);
  });

  it('keeps in-memory changes when saving storage fails', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { driver } = createStorageFixture();
    driver.setItem.mockImplementation(() => {
      throw new DOMException('Storage full', 'QuotaExceededError');
    });
    const store = createAppStore(driver);
    await vi.runAllTimersAsync();
    store.dispatch(setTheme({ mode: ThemeMode.Dark }));
    await vi.runAllTimersAsync();

    expect(store.getState().core.theme.mode).toBe(ThemeMode.Dark);
    expect(warn).toHaveBeenCalled();
  });

  it('starts normally when the browser does not expose localStorage', () => {
    vi.spyOn(window, 'localStorage', 'get').mockImplementation(() => {
      throw new DOMException('Storage blocked', 'SecurityError');
    });
    const store = createAppStore();

    expect(store.getState().rehydrated).toBe(true);
    store.dispatch(setTheme({ mode: ThemeMode.Dark }));
    expect(store.getState().core.theme.mode).toBe(ThemeMode.Dark);
  });

  it('renders the application only after the saved theme is restored', async () => {
    let resolveRead!: (value: string | null) => void;
    const pending = new Promise<string | null>((resolve) => {
      resolveRead = resolve;
    });
    const driver = {
      getItem: (key: string) => (key === 'persist:core' ? pending : null),
      setItem: vi.fn()
    };
    const store = createAppStore(driver);
    const Theme = () => <div>Theme: {useSelector((state: ReduxState) => state.core.theme.mode)}</div>;
    render(
      <Provider store={store}>
        <RehydrationGate>
          <Theme />
        </RehydrationGate>
      </Provider>
    );

    expect(screen.queryByText(/Theme:/)).not.toBeInTheDocument();
    await act(async () => {
      resolveRead(encodeLegacyState({ theme: { mode: 'dark' } }));
      await vi.runAllTimersAsync();
    });
    expect(screen.getByText('Theme: dark')).toBeInTheDocument();
  });
});
