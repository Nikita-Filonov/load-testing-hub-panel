import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Theme } from '@mui/material';
import { SxProps } from '@mui/system';
import { ReactNode, useMemo } from 'react';

export interface SelectOption<Value extends string | number, Option = undefined> {
  title: string;
  value: Value | null;
  option?: Option;
}

type BaseSelectProps<Value extends string | number, Option> = {
  sx?: SxProps<Theme>;
  label: string;
  value: Value | null;
  options: SelectOption<Value, Option>[];
  onSelect: (value: Value | null) => void;
  isNullable?: boolean;
  renderMenuItemContent?: (option: Option) => ReactNode;
};

export const BaseSelect = <Value extends string | number, Option>(props: BaseSelectProps<Value, Option>) => {
  const { sx, label, value, options, onSelect, isNullable, renderMenuItemContent } = props;

  const onSelectValue = (event: SelectChangeEvent) => {
    onSelect(event.target.value as Value);
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
            {renderMenuItemContent && option.option ? renderMenuItemContent(option.option) : option.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
