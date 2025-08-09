import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Theme } from '@mui/material';
import { SxProps } from '@mui/system';
import { ReactNode, useMemo } from 'react';

export interface SelectOption<Value extends string | number> {
  title: string;
  value: Value | null;
  content?: ReactNode;
}

type BaseSelectProps<Value extends string | number> = {
  sx?: SxProps<Theme>;
  label: string;
  value: Value | null;
  options: SelectOption<Value>[];
  onSelect: (value: Value | null) => void;
  isNullable?: boolean;
};

export const BaseSelect = <Value extends string | number>(props: BaseSelectProps<Value>) => {
  const { sx, label, value, options, onSelect, isNullable } = props;

  const onSelectValue = (event: SelectChangeEvent) => {
    onSelect((event.target.value || null) as Value);
  };

  const controlledOptions = useMemo(
    () => (isNullable ? [{ value: null, title: 'None' }, ...options] : options),
    [options, isNullable]
  );

  return (
    <FormControl sx={sx} size="small" fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select value={String(value || '')} label={label} onChange={onSelectValue}>
        {controlledOptions.map((option, index) => (
          <MenuItem key={index} value={option.value || ''}>
            {option.content || option.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
