import { BaseLabel } from '../BaseLabel';
import { Service } from '../../../Models/Services/Services';
import { FC } from 'react';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

type Props = {
  service: Service;
};

export const ServiceNumberOfLoadTestResultsLabel: FC<Props> = ({ service }) => {
  return (
    <BaseLabel
      sx={{ ml: 1 }}
      icon={<FormatListBulletedIcon fontSize={'small'} />}
      color={'success'}
      label={`Results: ${service.numberOfLoadTestResults}`}
    />
  );
};
