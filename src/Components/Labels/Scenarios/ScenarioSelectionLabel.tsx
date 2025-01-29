import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { FC, MouseEvent } from 'react';
import { BaseLabel } from '../BaseLabel';
import { Scenario } from '../../../Models/Services/Scenarios';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';

type Props = {
  scenario: Scenario;
  onSelectScenario: (event: MouseEvent<HTMLDivElement>) => void;
};

const ServiceSelectionLabel: FC<Props> = ({ scenario, onSelectScenario }) => {
  return (
    <BaseLabel
      sx={{ mr: 1.5 }}
      icon={<HandymanOutlinedIcon />}
      color={scenario.id ? 'success' : 'warning'}
      label={scenario.id ? scenario.name : 'Scenario not selected'}
      onClick={onSelectScenario}
    />
  );
};

const getState = (state: ReduxState) => ({
  scenario: state.scenarios.scenario
});
export default connect(getState)(ServiceSelectionLabel);
