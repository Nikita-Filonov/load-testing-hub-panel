import { MigrationManifest } from 'redux-persist';
import { INITIAL_CORE } from './InitialState';
import { PersistedState } from 'redux-persist/es/types';

export const CORE_MIGRATIONS: MigrationManifest = {
  1: (state: PersistedState): PersistedState => {
    return {
      ...state,
      chartSettings: INITIAL_CORE.chartSettings,
      tableSettings: INITIAL_CORE.tableSettings,
      chartWidgetSettings: INITIAL_CORE.chartWidgetSettings
    } as PersistedState;
  }
};
