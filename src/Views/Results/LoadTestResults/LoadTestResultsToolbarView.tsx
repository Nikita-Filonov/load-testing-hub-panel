import { BaseToolbarView } from '../../../Components/Toolbar/BaseToolbarView';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { FC, Fragment, useState } from 'react';
import {
  LoadTestResultsFilters,
  LoadTestResultsFiltersModal
} from '../../../Components/Modals/Results/LoadTestResultsFiltersModal';
import { countNotNullValues } from '../../../Services/Core/Utils';

type LoadTestResultsToolbarViewProps = {
  filters: LoadTestResultsFilters;
  setFilters: (filters: LoadTestResultsFilters) => void;
};

export const LoadTestResultsToolbarView: FC<LoadTestResultsToolbarViewProps> = ({ filters, setFilters }) => {
  const [loadTestResultsFiltersModal, setLoadTestResultsFiltersModal] = useState(false);

  const onLoadTestResultsFilters = () => setLoadTestResultsFiltersModal(true);

  return (
    <Fragment>
      <BaseToolbarView
        title={'Load tests results'}
        actions={[
          {
            icon: <FilterAltOutlinedIcon />,
            onClick: onLoadTestResultsFilters,
            badgeContent: countNotNullValues(filters)
          }
        ]}
      />
      <LoadTestResultsFiltersModal
        modal={loadTestResultsFiltersModal}
        setModal={setLoadTestResultsFiltersModal}
        filters={filters}
        setFilters={setFilters}
      />
    </Fragment>
  );
};
