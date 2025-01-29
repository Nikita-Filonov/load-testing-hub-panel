import { FC } from 'react';
import { BaseSelect } from '../BaseSelect';
import { IntegrationSystemType } from '../../../Models/Integrations/Integrations';

type Props = {
  type: IntegrationSystemType;
  onSelectType: (type: IntegrationSystemType) => void;
};

export const IntegrationSystemTypeSelect: FC<Props> = (props) => {
  const { type, onSelectType } = props;

  const onSelect = (type: IntegrationSystemType | null) => type && onSelectType(type);

  return (
    <BaseSelect
      sx={{ mt: 3 }}
      label={'System type'}
      value={type}
      onSelect={onSelect}
      options={[
        { value: IntegrationSystemType.Kibana, title: 'Kibana' },
        { value: IntegrationSystemType.Grafana, title: 'Grafana' }
      ]}
    />
  );
};
