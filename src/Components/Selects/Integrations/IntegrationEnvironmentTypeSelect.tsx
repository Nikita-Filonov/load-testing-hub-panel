import { FC } from 'react';
import { BaseSelect } from '../BaseSelect';
import { IntegrationEnvironmentType } from '../../../Models/Integrations/Integrations';

type IntegrationEnvironmentTypeProps = {
  type: IntegrationEnvironmentType;
  onSelectType: (type: IntegrationEnvironmentType) => void;
};

export const IntegrationEnvironmentTypeSelect: FC<IntegrationEnvironmentTypeProps> = (props) => {
  const { type, onSelectType } = props;

  const onSelect = (type: IntegrationEnvironmentType | null) => type && onSelectType(type);

  return (
    <BaseSelect
      sx={{ mt: 3 }}
      label={'Environment type'}
      value={type}
      onSelect={onSelect}
      options={[
        { value: IntegrationEnvironmentType.Internal, title: 'Internal' },
        { value: IntegrationEnvironmentType.Production, title: 'Production' }
      ]}
    />
  );
};
