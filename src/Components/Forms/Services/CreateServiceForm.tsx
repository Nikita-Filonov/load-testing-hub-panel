import Box from '@mui/material/Box';
import { CreateServiceRequest } from '../../../Models/Services/Services';
import { FC, useMemo } from 'react';
import { BaseTextField } from '../../TextFields/BaseTextField';
import { ValidationError } from '../../../Services/Clients/Models';
import { getValidationError } from '../../../Services/Clients/Utils';

type CreateServiceFormProps = {
  request: CreateServiceRequest;
  setRequest: (request: CreateServiceRequest) => void;
  validationErrors: ValidationError[];
};

export const CreateServiceForm: FC<CreateServiceFormProps> = (props) => {
  const { request, setRequest, validationErrors } = props;

  const onRequest =
    <T,>(key: keyof CreateServiceRequest) =>
    (value: T) => {
      setRequest({ ...request, [key]: value });
    };

  const errors = useMemo(
    () => ({
      url: getValidationError({ location: 'body.url', validationErrors }),
      name: getValidationError({ location: 'body.name', validationErrors }),
      cluster: getValidationError({ location: 'body.cluster', validationErrors }),
      namespace: getValidationError({ location: 'body.namespace', validationErrors })
    }),
    [validationErrors]
  );

  return (
    <Box>
      <BaseTextField
        sx={{ mt: 0 }}
        value={request.url}
        onChange={onRequest('url')}
        label={'URL'}
        error={Boolean(errors.url)}
        helperText={errors.url?.msg}
      />
      <BaseTextField
        value={request.name}
        onChange={onRequest('name')}
        label={'Name'}
        error={Boolean(errors.name)}
        helperText={errors.name?.msg}
      />
      <BaseTextField
        value={request.cluster}
        onChange={onRequest('cluster')}
        label={'Cluster'}
        error={Boolean(errors.cluster)}
        helperText={errors.cluster?.msg}
      />
      <BaseTextField
        value={request.namespace}
        onChange={onRequest('namespace')}
        label={'Namespace'}
        error={Boolean(errors.namespace)}
        helperText={errors.namespace?.msg}
      />
    </Box>
  );
};
