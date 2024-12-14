import Box from '@mui/material/Box';
import { BaseTextField } from '../../TextFields/BaseTextField';
import { UpdateScenarioRequest } from '../../../Models/Services/Scenarios';
import { ScenarioTagsMultipleAutocomplete } from '../../Autocompletes/Scenarios/ScenarioTagsMultipleAutocomplete';

type CreateScenarioFormProps<T extends UpdateScenarioRequest> = {
  request: T;
  setRequest: (request: T) => void;
};

export const CreateScenarioForm = <T extends UpdateScenarioRequest>(props: CreateScenarioFormProps<T>) => {
  const { request, setRequest } = props;

  const onRequest =
    <T,>(key: keyof UpdateScenarioRequest) =>
    (value: T) => {
      setRequest({ ...request, [key]: value });
    };

  return (
    <Box>
      <BaseTextField sx={{ mt: 0 }} value={request.name} onChange={onRequest('name')} label={'Name'} />
      <BaseTextField value={request.file} onChange={onRequest('file')} label={'File'} />
      <BaseTextField value={request.version} onChange={onRequest('version')} label={'Version'} />
      <ScenarioTagsMultipleAutocomplete tags={request.tags} setTags={onRequest('tags')} />
    </Box>
  );
};
