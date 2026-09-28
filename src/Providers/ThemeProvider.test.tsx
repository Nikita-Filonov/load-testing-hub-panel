import { expect, it } from 'vitest';
import { fireEvent, screen, renderHook } from '@testing-library/react';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { renderWithStore } from '../test/fixtures/render';
import { ThemeMode } from '../Models/Core/Theme';
import { ThemeProvider, useTheme } from './ThemeProvider';

const ThemeControls = () => {
  const { mode, setThemeMode } = useTheme();
  const mui = useMuiTheme();
  return <button onClick={() => setThemeMode(mode === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light)}>
    {mode} / {mui.palette.mode}
  </button>;
};

it('switches the rendered MUI palette and persists the selected theme in Redux', () => {
  const { store } = renderWithStore(<ThemeProvider><ThemeControls /></ThemeProvider>);
  expect(screen.getByRole('button', { name: 'light / light' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'light / light' }));
  expect(screen.getByRole('button', { name: 'dark / dark' })).toBeInTheDocument();
  expect(store.getState().core.theme.mode).toBe(ThemeMode.Dark);
  fireEvent.click(screen.getByRole('button', { name: 'dark / dark' }));
  expect(screen.getByRole('button', { name: 'light / light' })).toBeInTheDocument();
});

it('reports a missing theme provider to components using the theme hook', () => {
  expect(() => renderHook(useTheme)).toThrow(/called outside of a ThemeProvider/);
});
