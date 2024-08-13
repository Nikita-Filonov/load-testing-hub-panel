import { BaseDateTimePicker } from '../../Pickers/BaseDateTimePicker';
import { FC, useEffect, useState } from 'react';
import { GetResultsAnalyticsQuery } from '../../../Models/Analytics/ResultsAnalytics';
import { FiltersModal } from '../FiltersModal';
import { getDefaultAnalyticsEndDatetime, getDefaultAnalyticsStartDatetime } from '../../../Services/Analytics/Utils';

export interface AnalyticsFilters extends Pick<GetResultsAnalyticsQuery, 'startDatetime' | 'endDatetime'> {}

type AnalyticsFiltersModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  filters: AnalyticsFilters;
  setFilters: (filters: AnalyticsFilters) => void;
};

export const AnalyticsFiltersModal: FC<AnalyticsFiltersModalProps> = (props) => {
  const { modal, setModal, filters: externalFilters, setFilters: setExternalFilters } = props;
  const [filters, setFilters] = useState<AnalyticsFilters>(externalFilters);

  useEffect(() => {
    modal && setFilters(externalFilters);
  }, [modal]);

  const onClose = () => setModal(false);

  const onStartDatetime = (startDatetime: string | null) => startDatetime && setFilters({ ...filters, startDatetime });

  const onEndDatetime = (endDatetime: string | null) => endDatetime && setFilters({ ...filters, endDatetime });

  const onConfirm = () => {
    onClose();
    setExternalFilters(filters);
  };

  const onResetFilters = () => {
    onClose();
    setExternalFilters({
      endDatetime: getDefaultAnalyticsEndDatetime(),
      startDatetime: getDefaultAnalyticsStartDatetime()
    });
  };

  return (
    <FiltersModal
      title={'Analytics filters'}
      modal={modal}
      setModal={setModal}
      onConfirm={onConfirm}
      onResetFilters={onResetFilters}>
      <BaseDateTimePicker label={'Start datetime'} value={filters.startDatetime} onChange={onStartDatetime} />
      <BaseDateTimePicker sx={{ mt: 3 }} label={'End datetime'} value={filters.endDatetime} onChange={onEndDatetime} />
    </FiltersModal>
  );
};
