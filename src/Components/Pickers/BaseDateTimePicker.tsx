import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { enUS } from 'date-fns/locale/en-US';
import { FC } from 'react';
import { SxProps, Theme } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { SettingsManager } from '../../Services/Config';
import dayjs from 'dayjs';

type BaseDateTimePickerProps = {
  sx?: SxProps<Theme>;
  label: string;
  value?: string | null;
  onChange: (value: string | null) => void;
  maxDate?: Date;
  minDate?: Date;
  error?: boolean;
  helperText?: string;
};

export const BaseDateTimePicker: FC<BaseDateTimePickerProps> = (props) => {
  const { sx, label, value, onChange, maxDate, minDate, error, helperText } = props;

  const onChangeInternal = (date: Date | null) => {
    onChange(date ? dayjs(date).format(SettingsManager.apiDateTimeFormat) : null);
  };

  return (
    <LocalizationProvider adapterLocale={enUS} dateAdapter={AdapterDateFns}>
      <DateTimePicker
        slotProps={{
          textField: {
            sx,
            size: 'small',
            error,
            fullWidth: true,
            helperText,
            placeholder: '15.06.2022'
          }
        }}
        value={value === null ? null : dayjs(value, SettingsManager.apiDateTimeFormat).toDate()}
        label={label}
        maxDateTime={maxDate}
        minDateTime={minDate}
        onChange={onChangeInternal}
        format={SettingsManager.pickerDateTimeFormat}
      />
    </LocalizationProvider>
  );
};
