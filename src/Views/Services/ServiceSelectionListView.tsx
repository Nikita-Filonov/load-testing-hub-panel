import List from '@mui/material/List';
import { connect, useDispatch } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import { Service } from '../../Models/Services/Services';
import { FC, useEffect, useMemo, useState } from 'react';
import { BoxView } from '../../Components/Views/BoxView';
import { useServices } from '../../Providers/Services/ServicesProvider';
import { ServiceSelectionListItem } from '../../Components/ListItems/Services/ServiceSelectionListItem';
import { useLoadTestResultsNavigation } from '../../Services/Results/Hooks';
import { SearchTextField } from '../../Components/TextFields/SearchTextField';
import { clearServicesState } from '../../Redux/Services/Services/Slice';

type Props = {
  service: Service;
  services: Service[];
  onSelectServiceCallback?: () => void;
};

const ServiceSelectionListView: FC<Props> = ({ service, services, onSelectServiceCallback }) => {
  const dispatch = useDispatch();
  const { loading, getServices } = useServices();
  const { navigateResults } = useLoadTestResultsNavigation();
  const [search, setSearch] = useState('');

  useEffect(() => {
    getServices();
  }, []);

  const filteredServices = useMemo(
    () => services.filter((service) => service.name.toLowerCase().includes(search.toLowerCase())),
    [search, services]
  );

  const onSelectService = (newService: Service) => {
    if (service.id !== newService.id) {
      dispatch(clearServicesState());
      navigateResults(newService.id);
    }

    if (onSelectServiceCallback) {
      onSelectServiceCallback();
    }
  };

  return (
    <BoxView title={'Services'} loading={loading.getServices} containerSx={{ mt: 0 }}>
      {services.length > 0 && !loading.getServices && (
        <SearchTextField sx={{ mb: 2 }} value={search} onChange={setSearch} placeholder={'Search by name'} />
      )}
      <List dense>
        {filteredServices.map((item, index) => (
          <ServiceSelectionListItem
            key={index}
            service={item}
            selected={item.id == service.id}
            onSelectService={onSelectService}
          />
        ))}
      </List>
    </BoxView>
  );
};

const getState = (state: ReduxState) => ({
  service: state.services.service,
  services: state.services.services
});
export default connect(getState)(ServiceSelectionListView);
