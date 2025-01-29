import { CreateIntegrationRequest, UpdateIntegrationRequest } from '../../../Models/Integrations/Integrations';
import Box from '@mui/material/Box';
import { BaseTextField } from '../../TextFields/BaseTextField';
import { IntegrationEnvironmentTypeSelect } from '../../Selects/Integrations/IntegrationEnvironmentTypeSelect';
import { IntegrationSystemTypeSelect } from '../../Selects/Integrations/IntegrationSystemTypeSelect';
import { CreateIntegrationFormAlert } from '../../Alerts/Integrations/CreateIntegrationFormAlert';
import { BaseNumberTextField } from '../../TextFields/BaseNumberTextField';
import { ValidationError } from '../../../Services/Clients/Models';
import { useMemo } from 'react';
import { getValidationError } from '../../../Services/Clients/Utils';

type Props<T extends UpdateIntegrationRequest> = {
  request: T;
  setRequest: (request: T) => void;
  validationErrors: ValidationError[];
};

export const CreateIntegrationForm = <T extends UpdateIntegrationRequest>(props: Props<T>) => {
  const { request, setRequest, validationErrors } = props;

  const onRequest =
    <T,>(key: keyof CreateIntegrationRequest) =>
    (value: T) => {
      setRequest({ ...request, [key]: value });
    };

  const errors = useMemo(
    () => ({
      name: getValidationError({ location: 'body.name', validationErrors }),
      urlTemplate: getValidationError({ location: 'body.urlTemplate', validationErrors })
    }),
    [validationErrors]
  );

  return (
    <Box>
      <CreateIntegrationFormAlert />
      <BaseTextField
        value={request.name}
        onChange={onRequest('name')}
        label={'Name'}
        error={Boolean(errors.name)}
        helperText={errors.name?.msg}
      />
      <BaseNumberTextField value={request.orderIndex} onChange={onRequest('orderIndex')} label={'Order index'} />
      <IntegrationSystemTypeSelect type={request.systemType} onSelectType={onRequest('systemType')} />
      <IntegrationEnvironmentTypeSelect type={request.environmentType} onSelectType={onRequest('environmentType')} />
      <BaseTextField
        multiline
        rows={7}
        value={request.urlTemplate}
        onChange={onRequest('urlTemplate')}
        label={'URL template'}
        error={Boolean(errors.urlTemplate)}
        helperText={
          errors.urlTemplate
            ? errors.urlTemplate.msg
            : 'Provide a URL template to dynamically build URLs for opening integrations'
        }
      />
    </Box>
  );
};
