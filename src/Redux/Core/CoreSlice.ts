import { CoreInitialState, INITIAL_CORE } from './InitialState';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersistConfig } from 'redux-persist/es/types';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { ThemeSettings } from '../../Models/Core/Theme';

export const coreSlice = createSlice({
  name: 'core',
  initialState: INITIAL_CORE,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeSettings>) => {
      state.theme = action.payload;
    }
  }
});

const persistConfig: PersistConfig<CoreInitialState> = {
  key: 'core',
  storage,
  whitelist: ['theme']
};

export const { setTheme } = coreSlice.actions;

export default persistReducer(persistConfig, coreSlice.reducer);
