import { Autocomplete, SxProps, TextField, Theme } from '@mui/material';
import { HTMLAttributes, ReactNode, SyntheticEvent } from 'react';
import { AutocompleteRenderGetTagProps, AutocompleteRenderOptionState } from '@mui/material/Autocomplete/Autocomplete';
import { FilterOptionsState } from '@mui/base/useAutocomplete/useAutocomplete';

export type BaseMultipleAutocompleteProps<T> = {
  sx?: SxProps<Theme>;
  value: T[];
  options: T[];
  label: string;
  getOptionLabel: (option: T) => string;
  onChange: (entity: T[]) => void;
  renderTags?: (value: T[], getTagProps: AutocompleteRenderGetTagProps) => ReactNode;
  renderOption?: (props: HTMLAttributes<HTMLLIElement>, option: T, selected: boolean) => ReactNode;
  filterOptions?: (options: T[], state: FilterOptionsState<T>) => T[];
  isOptionEqualToValue?: (option: T, value: T) => boolean;
};

export const BaseMultipleAutocomplete = <T,>(props: BaseMultipleAutocompleteProps<T>) => {
  const {
    sx,
    value,
    label,
    options,
    onChange,
    renderTags,
    renderOption,
    getOptionLabel,
    filterOptions,
    isOptionEqualToValue
  } = props;

  const safeOnChange = (_: SyntheticEvent, newValue: (string | T)[]) => onChange(newValue as T[]);

  const internalRenderOption = (
    props: HTMLAttributes<HTMLLIElement>,
    option: T,
    state: AutocompleteRenderOptionState
  ) => {
    return renderOption && renderOption(props, option, state.selected);
  };

  return (
    <Autocomplete
      multiple
      fullWidth
      freeSolo={false}
      sx={{ mt: 3, ...sx }}
      size={'small'}
      value={value}
      options={options}
      onChange={safeOnChange}
      getOptionLabel={getOptionLabel}
      renderTags={renderTags}
      renderInput={(params) => <TextField {...params} label={label} variant={'outlined'} />}
      renderOption={renderOption ? internalRenderOption : undefined}
      filterOptions={filterOptions}
      disableCloseOnSelect={true}
      isOptionEqualToValue={isOptionEqualToValue}
    />
  );
};
