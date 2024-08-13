import React, { FC, PropsWithChildren, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, CssBaseline, ThemeProvider as LibThemeProvider } from '@mui/material';
import { ReduxState } from '../Redux/ReduxState';
import { ThemeMode } from '../Models/Core/Theme';
import { setTheme } from '../Redux/Core/CoreSlice';

const darkTheme = createTheme({
  palette: { mode: ThemeMode.Dark },
  components: { MuiPaper: { defaultProps: { elevation: 5 } } }
});

const lightTheme = createTheme({
  palette: { mode: ThemeMode.Light },
  components: { MuiPaper: { defaultProps: { elevation: 2 } } }
});

export type ThemeContextProps = {
  mode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
};

const ThemeContext = React.createContext<ThemeContextProps | null>(null);

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();

  const theme = useSelector((state: ReduxState) => state.core.theme);

  const setThemeMode = (mode: ThemeMode) => dispatch(setTheme({ ...theme, mode }));

  return (
    <ThemeContext.Provider value={{ mode: theme.mode, setThemeMode }}>
      <LibThemeProvider theme={theme.mode === ThemeMode.Light ? lightTheme : darkTheme}>
        <CssBaseline />
        {children}
      </LibThemeProvider>
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const event = useContext(ThemeContext);
  if (event == null) {
    throw new Error('useTheme() called outside of a ThemeProvider?');
  }
  return event;
};

export { ThemeProvider, useTheme };
