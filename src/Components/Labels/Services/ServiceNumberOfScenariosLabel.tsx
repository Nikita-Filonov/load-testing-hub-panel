import { BaseLabel } from '../BaseLabel';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import { Service } from '../../../Models/Services/Services';
import { FC } from 'react';

type Props = {
  service: Service;
};

export const ServiceNumberOfScenariosLabel: FC<Props> = ({ service }) => {
  return (
    <BaseLabel
      sx={{ ml: 1 }}
      icon={<HandymanOutlinedIcon fontSize={'small'} />}
      color={'secondary'}
      label={`Scenarios: ${service.numberOfScenarios}`}
    />
  );
};
