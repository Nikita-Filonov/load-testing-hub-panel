import { Close, Search } from '@mui/icons-material';
import { CircularProgress, IconButton, InputAdornment } from '@mui/material';
import { FC } from 'react';
import { BaseTextField, BaseTextFieldProps } from './BaseTextField';

type SearchTextFieldProps = {
  label?: string;
  loading?: boolean;
} & Omit<BaseTextFieldProps, 'label' | 'endAdornment'>;

export const SearchTextField: FC<SearchTextFieldProps> = (props) => {
  const { value, label, onChange, loading, ...other } = props;

  const onClear = () => onChange('');

  return (
    <BaseTextField
      label={label || 'Search'}
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
