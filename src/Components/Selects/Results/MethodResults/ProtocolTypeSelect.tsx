import { FC } from 'react';
import { ProtocolType } from '../../../../Models/Results/MethodResults';
import { BaseSelect } from '../../BaseSelect';

type Props = {
  protocol: ProtocolType | null;
  onSelectProtocol: (protocol: ProtocolType | null) => void;
};

export const ProtocolTypeSelect: FC<Props> = (props) => {
  const { protocol, onSelectProtocol } = props;

  const onSelect = (protocol: ProtocolType | null) => onSelectProtocol(protocol);

  return (
    <BaseSelect
      sx={{ mt: 3 }}
      label={'Protocol'}
      value={protocol}
      onSelect={onSelect}
      isNullable={true}
      options={[
        { value: ProtocolType.HTTP, title: 'HTTP' },
        { value: ProtocolType.GRPC, title: 'gRPC' },
        { value: ProtocolType.KAFKA, title: 'Kafka' }
      ]}
    />
  );
};
