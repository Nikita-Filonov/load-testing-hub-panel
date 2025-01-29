import Box from '@mui/material/Box';
import { BaseTextField } from '../../TextFields/BaseTextField';
import { UpdateScenarioRequest } from '../../../Models/Services/Scenarios';
import { ScenarioTagsMultipleAutocomplete } from '../../Autocompletes/Scenarios/ScenarioTagsMultipleAutocomplete';
import { BaseNumberTextField } from '../../TextFields/BaseNumberTextField';
import { ValidationError } from '../../../Services/Clients/Models';
import { useMemo } from 'react';
import { getValidationError } from '../../../Services/Clients/Utils';

type CreateScenarioFormProps<T extends UpdateScenarioRequest> = {
  request: T;
  setRequest: (request: T) => void;
  validationErrors: ValidationError[];
};

export const CreateScenarioForm = <T extends UpdateScenarioRequest>(props: CreateScenarioFormProps<T>) => {
  const { request, setRequest, validationErrors } = props;

  const onRequest =
    <T,>(key: keyof UpdateScenarioRequest) =>
    (value: T) => {
      setRequest({ ...request, [key]: value });
    };

  const errors = useMemo(
    () => ({
      name: getValidationError({ location: 'body.name', validationErrors }),
      file: getValidationError({ location: 'body.file', validationErrors }),
      version: getValidationError({ location: 'body.version', validationErrors }),
      runtimeDuration: getValidationError({ location: 'body.runtimeDuration', validationErrors })
    }),
    [validationErrors]
  );

  return (
    <Box>
      <BaseTextField
        sx={{ mt: 0 }}
        value={request.name}
        onChange={onRequest('name')}
        label={'Name'}
        error={Boolean(errors.name)}
        helperText={errors.name?.msg}
      />
      <BaseTextField
        value={request.file}
        onChange={onRequest('file')}
        label={'File'}
        error={Boolean(errors.file)}
        helperText={errors.file?.msg}
      />
      <BaseTextField
        value={request.version}
        onChange={onRequest('version')}
        label={'Version'}
        error={Boolean(errors.version)}
        helperText={errors.version?.msg}
      />
      <ScenarioTagsMultipleAutocomplete tags={request.tags} setTags={onRequest('tags')} />
      <BaseNumberTextField
        value={request.numberOfUsers}
        onChange={onRequest('numberOfUsers')}
        label={'Number of users'}
      />
      <BaseTextField
        value={request.runtimeDuration}
        onChange={onRequest('runtimeDuration')}
        label={'Runtime duration'}
        error={Boolean(errors.runtimeDuration)}
        helperText={errors.runtimeDuration ? errors.runtimeDuration?.msg : 'Enter duration (e.g., 22s, 3m, 3m22s)'}
      />
    </Box>
  );
};
