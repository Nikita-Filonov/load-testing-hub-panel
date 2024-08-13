import List from '@mui/material/List';
import { connect, useDispatch } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';
import { Service } from '../../Models/Services/Services';
import { FC, useEffect } from 'react';
import { ServiceListItem } from '../../Components/ListItems/Services/ServiceListItem';
import { useServices } from '../../Providers/Services/ServicesProvider';
import { setService } from '../../Redux/Services/Services/ServicesSlice';
import { BoxView } from '../../Components/Views/BoxView';
import { INITIAL_SCENARIOS } from '../../Redux/Services/Scenarios/InitialState';
import { setScenario } from '../../Redux/Services/Scenarios/ScenariosSlice';

type ServicesSettingsListViewProps = {
  service: Service;
  services: Service[];
};

const ServicesSettingsListView: FC<ServicesSettingsListViewProps> = ({ service, services }) => {
  const dispatch = useDispatch();
  const { loading, getSettingsServices } = useServices();

  useEffect(() => {
    getSettingsServices();
  }, []);

  const onSelectService = (service: Service) => {
    dispatch(setService(service));
    dispatch(setScenario(INITIAL_SCENARIOS.scenario));
  };

  return (
    <BoxView title={'Services'} loading={loading.getSettingsServices}>
      <List dense>
        {services.map((item, index) => (
          <ServiceListItem
            key={index}
            service={item}
            selected={item.name == service.name}
            onSelectService={onSelectService}
          />
        ))}
      </List>
    </BoxView>
  );
};

const getState = (state: ReduxState) => ({
  service: state.services.service,
  services: state.services.settingsServices
});
export default connect(getState)(ServicesSettingsListView);
