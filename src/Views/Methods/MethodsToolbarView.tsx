import { BaseToolbarView } from '../../Components/Toolbar/BaseToolbarView';
import { FC, Fragment, useState } from 'react';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { MethodsFilters, MethodsFiltersModal } from '../../Components/Modals/Methods/MethodsFiltersModal';
import { countNotNullValues } from '../../Services/Core/Utils';

type MethodsToolbarViewProps = {
  filters: MethodsFilters;
  setFilters: (filters: MethodsFilters) => void;
};

export const MethodsToolbarView: FC<MethodsToolbarViewProps> = (props) => {
  const { filters, setFilters } = props;
  const [methodsFiltersModal, setMethodsFiltersModal] = useState(false);

  const onMethodsFiltersModal = () => setMethodsFiltersModal(true);

  return (
    <Fragment>
      <BaseToolbarView
        title={'Aggregated methods'}
        actions={[
          {
            icon: <FilterAltOutlinedIcon />,
            onClick: onMethodsFiltersModal,
            badgeContent: countNotNullValues(filters)
          }
        ]}
      />
      <MethodsFiltersModal
        modal={methodsFiltersModal}
        setModal={setMethodsFiltersModal}
        filters={filters}
        setFilters={setFilters}
      />
    </Fragment>
  );
};
