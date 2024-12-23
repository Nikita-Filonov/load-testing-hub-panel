import { FC, useEffect, useState } from 'react';
import { GetMethodsQuery } from '../../../Models/Results/Methods';
import { BaseTextField } from '../../TextFields/BaseTextField';
import { FiltersModal } from '../FiltersModal';
import { BaseDateTimePicker } from '../../Pickers/BaseDateTimePicker';
import { getDefaultMethodsFilters } from '../../../Services/Methods/Utils';

export interface MethodsFilters extends Pick<GetMethodsQuery, 'method' | 'endDatetime' | 'startDatetime'> {}

type MethodsFiltersModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  filters: MethodsFilters;
  setFilters: (filters: MethodsFilters) => void;
};

export const MethodsFiltersModal: FC<MethodsFiltersModalProps> = (props) => {
  const { modal, setModal, filters: externalFilters, setFilters: setExternalFilters } = props;
  const [filters, setFilters] = useState<MethodsFilters>(externalFilters);

  useEffect(() => {
    modal && setFilters(externalFilters);
  }, [modal]);

  const onClose = () => setModal(false);

  const onMethod = (method: string) => setFilters({ ...filters, method });

  const onStartDatetime = (startDatetime: string | null) => startDatetime && setFilters({ ...filters, startDatetime });

  const onEndDatetime = (endDatetime: string | null) => endDatetime && setFilters({ ...filters, endDatetime });

  const onConfirm = () => {
    onClose();
    setExternalFilters(filters);
  };

  const onResetFilters = () => {
    onClose();
    setExternalFilters(getDefaultMethodsFilters());
  };

  return (
    <FiltersModal
      title={'Methods filters'}
      modal={modal}
      setModal={setModal}
      onConfirm={onConfirm}
      onResetFilters={onResetFilters}>
      <BaseTextField sx={{ mt: 0 }} label={'Method'} value={filters.method || ''} onChange={onMethod} />
      <BaseDateTimePicker
        sx={{ mt: 3 }}
        label={'Start datetime'}
        value={filters.startDatetime}
        onChange={onStartDatetime}
      />
      <BaseDateTimePicker sx={{ mt: 3 }} label={'End datetime'} value={filters.endDatetime} onChange={onEndDatetime} />
    </FiltersModal>
  );
};
