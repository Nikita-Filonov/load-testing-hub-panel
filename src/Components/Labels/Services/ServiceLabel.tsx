import { BaseLinkLabel } from '../BaseLinkLabel';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { Service } from '../../../Models/Services/Services';
import { FC } from 'react';
import { BaseButtonLabel } from '../BaseButtonLabel';

type ServiceLabelProps = {
  service: Service;
  onSelectLabel: () => void;
};

const ServiceLabel: FC<ServiceLabelProps> = ({ service, onSelectLabel }) => {
  return service.name ? (
    <BaseLinkLabel sx={{ mr: 2 }} url={service.url} color={'success'} label={service.name} />
  ) : (
    <BaseButtonLabel sx={{ mr: 2 }} color={'warning'} label={'Select service to view data'} onClick={onSelectLabel} />
  );
};

const getState = (state: ReduxState) => ({
  service: state.services.service
});
export default connect(getState)(ServiceLabel);
