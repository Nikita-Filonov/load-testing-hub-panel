import { SettingsView } from '../../Components/Views/SettingsView';
import { Service } from '../../Models/Services/Services';
import { FC, useState } from 'react';
import ServiceDetailsView from './ServiceDetailsView';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import UpdateServiceModal from '../../Components/Modals/Services/UpdateServiceModal';
import { connect } from 'react-redux';
import { ReduxState } from '../../Redux/ReduxState';

type ServiceSettingsViewProps = {
  service: Service;
};

const ServiceSettingsView: FC<ServiceSettingsViewProps> = ({ service }) => {
  const [updateServiceModal, setUpdateServiceModal] = useState(false);

  const onUpdateService = () => setUpdateServiceModal(true);

  return (
    <SettingsView
      title={`General ${service.name} settings`}
      actions={[{ icon: <EditOutlinedIcon />, onClick: onUpdateService }]}>
      <ServiceDetailsView serviceId={service.id} />
      <UpdateServiceModal modal={updateServiceModal} setModal={setUpdateServiceModal} serviceId={service.id} />
    </SettingsView>
  );
};

const getState = (state: ReduxState) => ({ service: state.services.service });
export default connect(getState)(ServiceSettingsView);
