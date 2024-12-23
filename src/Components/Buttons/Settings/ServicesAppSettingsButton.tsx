import Badge from '@mui/material/Badge';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import IconButton from '@mui/material/IconButton';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { ReduxState } from '../../../Redux/ReduxState';
import { Scenario } from '../../../Models/Services/Scenarios';

type ServicesAppSettingsButtonProps = {
  scenario: Scenario;
  onAppSettings: () => void;
};

const ServicesAppSettingsButton: FC<ServicesAppSettingsButtonProps> = ({ scenario, onAppSettings }) => {
  return (
    <IconButton sx={{ mr: 2 }} color="inherit" onClick={onAppSettings}>
      <Badge badgeContent={scenario.id ? 1 : null} color="primary">
        <SettingsOutlinedIcon />
      </Badge>
    </IconButton>
  );
};

const getState = (state: ReduxState) => ({ scenario: state.scenarios.scenario });
export default connect(getState)(ServicesAppSettingsButton);
