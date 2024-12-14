import { BaseRadioButtons } from '../BaseRadioButtons';
import { FC } from 'react';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { ThemeMode } from '../../../Models/Core/Theme';
import { SxProps, Theme } from '@mui/material';

type ThemeModeRadioButtonsProps = {
  sx?: SxProps<Theme>;
  mode: ThemeMode;
  onSelectThemeMode: (mode: ThemeMode) => void;
};

export const ThemeModeRadioButtons: FC<ThemeModeRadioButtonsProps> = (props) => {
  const { sx, mode, onSelectThemeMode } = props;

  return (
    <BaseRadioButtons
      sx={{ mt: 3, ...sx }}
      label={'Theme mode'}
      value={mode}
      options={[
        { icon: <DarkModeOutlinedIcon />, value: ThemeMode.Dark, title: 'Dark' },
        { icon: <LightModeOutlinedIcon />, value: ThemeMode.Light, title: 'Light' }
      ]}
      onSelect={onSelectThemeMode}
    />
  );
};
