import { ThemeModeRadioButtons } from '../../../Components/Radiobuttons/Actions/ThemeModeRadioButtons';
import { useTheme } from '../../../Providers/ThemeProvider';

export const ThemeModeSettingsView = () => {
  const { mode, setThemeMode } = useTheme();

  return <ThemeModeRadioButtons sx={{ mt: 0 }} mode={mode} onSelectThemeMode={setThemeMode} />;
};
