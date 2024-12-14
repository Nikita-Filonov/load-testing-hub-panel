import { BaseLinkLabel } from '../BaseLinkLabel';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { Service } from '../../../Models/Services/Services';
import { FC } from 'react';

type ServiceLabelProps = {
  service: Service;
};

const ServiceLabel: FC<ServiceLabelProps> = ({ service }) => {
  return service.id ? <BaseLinkLabel sx={{ mr: 3 }} url={service.url} color={'success'} label={service.name} /> : null;
};

const getState = (state: ReduxState) => ({
  service: state.services.service
});
export default connect(getState)(ServiceLabel);
