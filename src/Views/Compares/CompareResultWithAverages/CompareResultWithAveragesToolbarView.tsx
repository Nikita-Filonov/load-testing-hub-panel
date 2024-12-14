import { BaseToolbarView } from '../../../Components/Toolbar/BaseToolbarView';
import { FC, Fragment, useState } from 'react';
import { useLoadTestResultDetailsToolbarActions } from '../../../Services/Results/Hooks';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { countNotNullValues } from '../../../Services/Core/Utils';
import { AnalyticsFilters, AnalyticsFiltersModal } from '../../../Components/Modals/Analytics/AnalyticsFiltersModal';

type CompareResultWithAveragesToolbarViewProps = {
  filters: AnalyticsFilters;
  setFilters: (filters: AnalyticsFilters) => void;
};

export const CompareResultWithAveragesToolbarView: FC<CompareResultWithAveragesToolbarViewProps> = (props) => {
  const { filters, setFilters } = props;
  const actions = useLoadTestResultDetailsToolbarActions();
  const [analyticsFiltersModal, setAnalyticsFiltersModal] = useState(false);

  const onAnalyticsFiltersModal = () => setAnalyticsFiltersModal(true);

  return (
    <Fragment>
      <BaseToolbarView
        title={'Comparison with averages'}
        actions={[
          ...actions,
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
