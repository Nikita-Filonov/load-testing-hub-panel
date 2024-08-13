import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Theme } from '@mui/material';
import { ChangeEvent, ReactNode } from 'react';
import { SxProps } from '@mui/system';

export interface SelectOption<Value extends string> {
  icon?: ReactNode;
  title: string;
  value: Value | null;
}

type BaseRadioButtonsProps<Value extends string> = {
  sx?: SxProps<Theme>;
  label?: string;
  value: Value;
  options: SelectOption<Value>[];
  onSelect: (value: Value) => void;
  disabled?: boolean;
};

export const BaseRadioButtons = <Value extends string>(props: BaseRadioButtonsProps<Value>) => {
  const { sx, label, value, options, onSelect, disabled } = props;

  const onSelectValue = (_: ChangeEvent<HTMLInputElement>, value: string) => {
    onSelect(value as Value);
  };

  return (
    <FormControl sx={sx} size="small" fullWidth disabled={disabled}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup value={value} onChange={onSelectValue}>
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option.value}
            control={<Radio icon={option.icon} checkedIcon={option.icon} />}
            label={option.title}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
