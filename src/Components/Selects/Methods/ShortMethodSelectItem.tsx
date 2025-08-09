import { FC } from 'react';
import { ShortMethod } from '../../../Models/Methods/Methods';
import { BaseSelectItem } from '../BaseSelectItem';
import { MethodResultProtocolLabel } from '../../Labels/Results/MethodResults/MethodResultProtocolLabel';

type Props = {
  method: ShortMethod;
};

export const ShortMethodSelectItem: FC<Props> = ({ method }) => {
  return <BaseSelectItem title={method.method} label={<MethodResultProtocolLabel protocol={method.protocol} />} />;
};
