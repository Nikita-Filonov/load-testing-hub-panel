import { WidgetView } from '../../Components/Views/WidgetView';
import { ThemeModeRadioButtons } from '../../Components/Radiobuttons/Actions/ThemeModeRadioButtons';
import { useTheme } from '../../Providers/ThemeProvider';

export const LocalSettingsView = () => {
  const { mode, setThemeMode } = useTheme();

  return (
    <WidgetView flat title={'Local settings'}>
      <ThemeModeRadioButtons mode={mode} onSelectThemeMode={setThemeMode} />
    </WidgetView>
  );
};
