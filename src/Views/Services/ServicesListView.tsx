import { FC, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import List from '@mui/material/List';
import { EmptyView } from '../../Components/Views/EmptyView';
import { Service } from '../../Models/Services/Services';
import { useServices } from '../../Providers/Services/ServicesProvider';
import { ServiceListItem } from '../../Components/ListItems/Services/ServiceListItem';
import { SettingsView } from '../../Components/Views/SettingsView';
import UpdateServiceModal from '../../Components/Modals/Services/UpdateServiceModal';
import { INITIAL_SERVICES } from '../../Redux/Services/Services/InitialState';
import { CreateServiceModal } from '../../Components/Modals/Services/CreateServiceModal';
import AddIcon from '@mui/icons-material/Add';
import { ServiceDetailsModal } from '../../Components/Modals/Services/ServiceDetailsModal';
import { SearchTextField } from '../../Components/TextFields/SearchTextField';

type ServicesSettingsViewProps = {
  services: Service[];
};

const ServicesListView: FC<ServicesSettingsViewProps> = (props) => {
  const { services } = props;
  const { loading, getServices } = useServices();
  const [service, setService] = useState<Service>(INITIAL_SERVICES.service);
  const [search, setSearch] = useState('');
  const [updateServiceModal, setUpdateServiceModal] = useState(false);
  const [createServiceModal, setCreateServiceModal] = useState(false);
  const [serviceDetailsModal, setServiceDetailsModal] = useState(false);

  useEffect(() => {
    getServices();
  }, []);

  const filteredServices = useMemo(
    () => services.filter((service) => service.name.toLowerCase().includes(search.toLowerCase())),
    [search, services]
  );

  const onUpdateService = (service: Service) => {
    setService(service);
    setUpdateServiceModal(true);
  };

  const onServiceDetails = (service: Service) => {
    setService(service);
    setServiceDetailsModal(true);
  };

  const onCreateService = () => setCreateServiceModal(true);

  return (
    <SettingsView
      title={'Services'}
      loading={loading.getServices}
      actions={[{ icon: <AddIcon />, onClick: onCreateService }]}>
      {services.length === 0 && !loading.getServices && (
        <EmptyView
          title={'There is no services'}
          description={'To create a service, click on the plus sign in the upper right corner'}
        />
      )}
      {services.length > 0 && !loading.getServices && (
        <SearchTextField sx={{ mb: 2, mt: 0 }} label={'Search by name'} value={search} onChange={setSearch} />
      )}
      <List dense>
        {filteredServices.map((item, index) => (
          <ServiceListItem
            key={index}
            service={item}
            onUpdateService={onUpdateService}
            onServiceDetails={onServiceDetails}
          />
        ))}
      </List>
      <CreateServiceModal modal={createServiceModal} setModal={setCreateServiceModal} />
      <UpdateServiceModal modal={updateServiceModal} setModal={setUpdateServiceModal} serviceId={service.id} />
      <ServiceDetailsModal modal={serviceDetailsModal} setModal={setServiceDetailsModal} serviceId={service.id} />
    </SettingsView>
  );
};

const getState = (state: ReduxState) => ({
  services: state.services.services
});
export default connect(getState)(ServicesListView);
