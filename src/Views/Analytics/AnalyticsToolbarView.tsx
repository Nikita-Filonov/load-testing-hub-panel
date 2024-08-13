import { BaseToolbarView } from '../../Components/Toolbar/BaseToolbarView';
import { FC, Fragment, useState } from 'react';
import { AnalyticsFilters, AnalyticsFiltersModal } from '../../Components/Modals/Analytics/AnalyticsFiltersModal';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { SxProps, Theme } from '@mui/material';

type AnalyticsToolbarViewProps = {
  title: string;
  filters: AnalyticsFilters;
  setFilters: (filters: AnalyticsFilters) => void;
  containerSx?: SxProps<Theme>;
};

export const AnalyticsToolbarView: FC<AnalyticsToolbarViewProps> = (props) => {
  const { title, filters, setFilters, containerSx } = props;
  const [analyticsFiltersModal, setAnalyticsFiltersModal] = useState(false);

  const onAnalyticsFiltersModal = () => setAnalyticsFiltersModal(true);

  return (
    <Fragment>
      <BaseToolbarView
        title={title}
        actions={[{ icon: <FilterAltOutlinedIcon />, onClick: onAnalyticsFiltersModal, badgeContent: 2 }]}
        containerSx={containerSx}
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
