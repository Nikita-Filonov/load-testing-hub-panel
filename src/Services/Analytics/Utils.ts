import dayjs from 'dayjs';
import { SettingsManager } from '../Config';

export const getDefaultAnalyticsStartDatetime = () =>
  dayjs().add(-14, 'days').format(SettingsManager.apiDateTimeFormat);

export const getDefaultAnalyticsEndDatetime = () => dayjs().add(14, 'days').format(SettingsManager.apiDateTimeFormat);
