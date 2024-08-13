import { ThemeMode, ThemeSettings } from '../../Models/Core/Theme';

export type CoreInitialState = {
  theme: ThemeSettings;
};

export const INITIAL_CORE: CoreInitialState = {
  theme: { mode: ThemeMode.Light }
};
