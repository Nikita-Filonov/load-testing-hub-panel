import { SxProps, TextField, Theme } from '@mui/material';
import { FC, ReactNode } from 'react';

type BaseNumberTextFieldProps = {
  sx?: SxProps<Theme>;
  value: number | '';
  onChange: (value: number) => void;
  label: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
};

export const BaseNumberTextField: FC<BaseNumberTextFieldProps> = (props) => {
  const { sx, value, onChange, label, disabled, error, helperText, endAdornment, startAdornment } = props;

  return (
    <TextField
      sx={{ mt: 3, ...sx }}
      value={value.toString()}
      onChange={(event) => onChange(Number(event.target.value))}
      size={'small'}
      fullWidth
      label={label}
      error={error}
      disabled={disabled}
      helperText={helperText}
      type="number"
      InputLabelProps={{ shrink: true }}
      InputProps={{ endAdornment, startAdornment }}
    />
  );
};
