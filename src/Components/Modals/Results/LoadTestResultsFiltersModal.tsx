import { BaseDateTimePicker } from '../../Pickers/BaseDateTimePicker';
import { FC, useEffect, useState } from 'react';
import { GetLoadTestResultsQuery } from '../../../Models/Results/LoadTestResults';
import { BaseTextField } from '../../TextFields/BaseTextField';
import { FiltersModal } from '../FiltersModal';

export interface LoadTestResultsFilters
  extends Pick<GetLoadTestResultsQuery, 'startedAt' | 'finishedAt' | 'triggerCIProjectVersion'> {}

type LoadTestResultsFiltersModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  filters: LoadTestResultsFilters;
  setFilters: (filters: LoadTestResultsFilters) => void;
};

export const LoadTestResultsFiltersModal: FC<LoadTestResultsFiltersModalProps> = (props) => {
  const { modal, setModal, filters: externalFilters, setFilters: setExternalFilters } = props;
  const [filters, setFilters] = useState<LoadTestResultsFilters>(externalFilters);

  useEffect(() => {
    modal && setFilters(externalFilters);
  }, [modal]);

  const onClose = () => setModal(false);

  const onStartDatetime = (startedAt: string | null) => setFilters({ ...filters, startedAt });

  const onEndDatetime = (finishedAt: string | null) => setFilters({ ...filters, finishedAt });

  const onTriggerCIProjectVersion = (triggerCIProjectVersion: string) => {
    setFilters({ ...filters, triggerCIProjectVersion });
  };

  const onConfirm = () => {
    onClose();
    setExternalFilters(filters);
  };

  const onResetFilters = () => {
    onClose();
    setExternalFilters({
      startedAt: null,
      finishedAt: null,
      triggerCIProjectVersion: null
    });
  };

  return (
    <FiltersModal
      title={'Load tests results filters'}
      modal={modal}
      setModal={setModal}
      onConfirm={onConfirm}
      onResetFilters={onResetFilters}>
      <BaseTextField
        sx={{ mt: 0 }}
        label={'Version'}
        value={filters.triggerCIProjectVersion || ''}
        onChange={onTriggerCIProjectVersion}
      />
      <BaseDateTimePicker sx={{ mt: 3 }} label={'Started at'} value={filters.startedAt} onChange={onStartDatetime} />
      <BaseDateTimePicker sx={{ mt: 3 }} label={'Finished at'} value={filters.finishedAt} onChange={onEndDatetime} />
    </FiltersModal>
  );
};
