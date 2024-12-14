import { Close, Search } from '@mui/icons-material';
import { CircularProgress, IconButton, InputAdornment } from '@mui/material';
import { FC } from 'react';
import { BaseTextField, BaseTextFieldProps } from './BaseTextField';

type SearchTextFieldProps = {
  loading?: boolean;
} & Omit<BaseTextFieldProps, 'endAdornment'>;

export const SearchTextField: FC<SearchTextFieldProps> = (props) => {
  const { value, onChange, loading, ...other } = props;

  const onClear = () => onChange('');

  return (
    <BaseTextField
      value={value}
      onChange={onChange}
      {...other}
      startAdornment={
        <InputAdornment position="start">
          {loading ? <CircularProgress color="inherit" size={20} /> : <Search fontSize={'small'} />}
        </InputAdornment>
      }
      endAdornment={
        value.length > 0 && (
          <InputAdornment position="end">
            <IconButton edge="end" onClick={onClear}>
              <Close fontSize={'small'} />
            </IconButton>
          </InputAdornment>
        )
      }
    />
  );
};
