import { FC, Fragment, useState } from 'react';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { countNotNullValues } from '../../../Services/Core/Utils';
import { AnalyticsFilters, AnalyticsFiltersModal } from '../../../Components/Modals/Analytics/AnalyticsFiltersModal';
import BaseLoadTestResultDetailsToolbarView from '../../Results/LoadTestResults/BaseLoadTestResultDetailsToolbarView';

type CompareResultWithAveragesToolbarViewProps = {
  filters: AnalyticsFilters;
  setFilters: (filters: AnalyticsFilters) => void;
};

export const CompareResultWithAveragesToolbarView: FC<CompareResultWithAveragesToolbarViewProps> = (props) => {
  const { filters, setFilters } = props;
  const [analyticsFiltersModal, setAnalyticsFiltersModal] = useState(false);

  const onAnalyticsFiltersModal = () => setAnalyticsFiltersModal(true);

  return (
    <Fragment>
      <BaseLoadTestResultDetailsToolbarView
        title={'Comparison with averages'}
        actions={[
          {
            icon: <FilterAltOutlinedIcon />,
            onClick: onAnalyticsFiltersModal,
            badgeContent: countNotNullValues(filters)
          }
        ]}
      />
      <AnalyticsFiltersModal
        modal={analyticsFiltersModal}
        setModal={setAnalyticsFiltersModal}
        filters={filters}
        setFilters={setFilters}
      />
    </Fragment>
  );
};
