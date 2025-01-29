import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { Service } from '../../../Models/Services/Services';
import { FC, MouseEvent } from 'react';
import { BaseLabel } from '../BaseLabel';
import CodeIcon from '@mui/icons-material/Code';

type Props = {
  service: Service;
  onSelectService: (event: MouseEvent<HTMLDivElement>) => void;
};

const ServiceSelectionLabel: FC<Props> = ({ service, onSelectService }) => {
  return (
    <BaseLabel sx={{ mr: 1.5 }} icon={<CodeIcon />} color={'success'} label={service.name} onClick={onSelectService} />
  );
};

const getState = (state: ReduxState) => ({
  service: state.services.service
});
export default connect(getState)(ServiceSelectionLabel);
