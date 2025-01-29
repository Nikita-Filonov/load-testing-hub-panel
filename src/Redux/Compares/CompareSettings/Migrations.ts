import { MigrationManifest } from 'redux-persist';
import { INITIAL_COMPARE_SETTINGS } from './InitialState';
import { PersistedState } from 'redux-persist/es/types';

export const COMPARE_SETTINGS_MIGRATIONS: MigrationManifest = {
  1: (state: PersistedState): PersistedState => {
    return {
      ...state,
      compareWidgetsSettings: INITIAL_COMPARE_SETTINGS.compareWidgetsSettings
    } as PersistedState;
  }
};
