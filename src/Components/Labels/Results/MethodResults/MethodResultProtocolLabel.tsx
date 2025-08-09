import { BaseLabel } from '../../BaseLabel';
import { ProtocolType } from '../../../../Models/Results/MethodResults';
import { FC } from 'react';

type Props = {
  protocol: ProtocolType;
};

export const MethodResultProtocolLabel: FC<Props> = ({ protocol }) => {
  return <BaseLabel label={protocol} color={'info'} />;
};
