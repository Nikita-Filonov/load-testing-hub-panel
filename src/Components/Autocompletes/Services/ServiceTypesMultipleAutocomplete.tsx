import { BaseMultipleAutocomplete } from '../BaseMultipleAutocomplete';
import { FC } from 'react';
import { ServiceType } from '../../../Models/Services/Services';

type ScenarioTagsMultipleAutocompleteProps = {
  types: ServiceType[];
  setTypes: (types: ServiceType[]) => void;
};

export const ScenarioTagsMultipleAutocomplete: FC<ScenarioTagsMultipleAutocompleteProps> = (props) => {
  const { types, setTypes } = props;

  return (
    <BaseMultipleAutocomplete
      sx={{ mt: 0 }}
      value={types}
      options={[ServiceType.Internal, ServiceType.Production]}
      label={'Types'}
      getOptionLabel={(option: ServiceType) => option}
      onChange={setTypes}
    />
  );
};
