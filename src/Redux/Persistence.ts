import { createReducer } from '@reduxjs/toolkit';
import { Options, REMEMBER_REHYDRATED } from 'redux-remember';
import { INITIAL_CORE } from './Core/InitialState';
import { INITIAL_SERVICES } from './Services/Services/InitialState';
import { INITIAL_SCENARIOS } from './Services/Scenarios/InitialState';
import { INITIAL_COMPARE_SETTINGS } from './Compares/CompareSettings/InitialState';

const INITIAL_STATES = {
  core: INITIAL_CORE,
  services: INITIAL_SERVICES,
  scenarios: INITIAL_SCENARIOS,
  compareSettings: INITIAL_COMPARE_SETTINGS
};

type RememberedKey = keyof typeof INITIAL_STATES;

const PERSISTED_FIELDS: { [Key in RememberedKey]: (keyof (typeof INITIAL_STATES)[Key])[] } = {
  core: ['theme', 'tableSettings', 'chartSettings', 'chartWidgetSettings'],
  services: ['service'],
  scenarios: ['scenario'],
  compareSettings: ['compareWidgetsSettings']
};

export const REMEMBERED_KEYS = Object.keys(INITIAL_STATES) as RememberedKey[];

export const rehydratedReducer = createReducer(false, (builder) => {
  builder.addCase(REMEMBER_REHYDRATED, () => true);
});

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const pickPersistedFields = (state: Record<string, unknown>, key: RememberedKey) =>
  Object.fromEntries(
    PERSISTED_FIELDS[key].filter((field) => Object.hasOwn(state, field)).map((field) => [field, state[field]])
  );

const unserialize = (data: string, sliceKey: string) => {
  const key = sliceKey as RememberedKey;

  try {
    const saved: unknown = JSON.parse(data);
    if (!isRecord(saved)) throw new Error('Invalid saved state');

    let state: Record<string, unknown>;
    if (saved.version === 1 && isRecord(saved.state)) {
      state = pickPersistedFields(saved.state, key);
    } else {
      // Legacy Redux Persist stores each field and its metadata as a separate JSON string.
      state = Object.fromEntries(
        Object.entries(pickPersistedFields(saved, key)).map(([field, value]) => [field, JSON.parse(value as string)])
      );
      const version = typeof saved._persist === 'string' ? JSON.parse(saved._persist).version : -1;

      // Keep the migrations that previously upgraded version 0 preferences to version 1.
      if (version < 1 && key === 'core') {
        delete state.tableSettings;
        delete state.chartSettings;
        delete state.chartWidgetSettings;
      }
      if (version < 1 && key === 'compareSettings') delete state.compareWidgetsSettings;
    }

    if (Object.values(state).some((value) => !isRecord(value))) {
      throw new Error('Invalid saved preferences');
    }

    return { ...INITIAL_STATES[key], ...state };
  } catch (error) {
    console.warn(`Could not restore ${key} preferences`, error);
    return INITIAL_STATES[key];
  }
};

export const REMEMBER_OPTIONS: Partial<Options> = {
  prefix: 'persist:',
  serialize: (state: Record<string, unknown>, key: string) =>
    JSON.stringify({
      version: 1,
      state: pickPersistedFields(state, key as RememberedKey)
    }),
  unserialize
};
