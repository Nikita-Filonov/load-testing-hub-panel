import { Button, SxProps, TextField, Theme } from '@mui/material';
import { FC, Fragment, ReactNode } from 'react';

export type BaseTextFieldProps = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  helperText?: string;
  maxLength?: number;
  multiline?: boolean;
  rows?: number;
  type?: 'text' | 'password';
  sx?: SxProps<Theme>;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  actionTitle?: string;
  onAction?: () => void;
};

export const BaseTextField: FC<BaseTextFieldProps> = (props) => {
  const {
    value,
    onChange,
    label,
    placeholder,
    disabled,
    error,
    helperText,
    maxLength,
    multiline,
    rows,
    type = 'text',
    sx = {},
    startAdornment,
    endAdornment,
    actionTitle,
    onAction
  } = props;

  return (
    <Fragment>
      <TextField
        rows={rows}
        multiline={multiline}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        sx={{ mt: 3, ...sx }}
        size={'small'}
        fullWidth
        label={label}
        variant="outlined"
        type={type}
        error={error}
        helperText={helperText}
        InputProps={{ startAdornment, endAdornment }}
        inputProps={{ maxLength }}
      />
      {actionTitle && (
        <Button sx={{ mt: 1 }} size={'small'} variant={'outlined'} onClick={onAction}>
          {actionTitle}
        </Button>
      )}
    </Fragment>
  );
};
