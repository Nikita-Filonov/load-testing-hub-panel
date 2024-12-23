import { GetServicesQuery, ServiceType } from '../../../Models/Services/Services';
import { FC } from 'react';
import { ScenarioTagsMultipleAutocomplete } from '../../Autocompletes/Services/ServiceTypesMultipleAutocomplete';
import { FiltersModal } from '../FiltersModal';
import { getDefaultServicesFilters } from '../../../Services/Services/Utils';

type FilterServicesModalProps = {
  modal: boolean;
  setModal: (modal: boolean) => void;
  filters: GetServicesQuery;
  setFilters: (filters: GetServicesQuery) => void;
};

export const FilterServicesModal: FC<FilterServicesModalProps> = (props) => {
  const { modal, setModal, filters, setFilters } = props;

  const onClose = () => setModal(false);

  const onTypes = (types: ServiceType[]) => setFilters({ ...filters, types });

  const onResetFilters = () => {
    onClose();
    setFilters(getDefaultServicesFilters());
  };

  return (
    <FiltersModal title={'Filter services'} modal={modal} setModal={setModal} onResetFilters={onResetFilters}>
      <ScenarioTagsMultipleAutocomplete types={filters.types} setTypes={onTypes} />
    </FiltersModal>
  );
};
