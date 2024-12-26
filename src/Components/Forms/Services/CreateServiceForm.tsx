import Box from '@mui/material/Box';
import { CreateServiceRequest } from '../../../Models/Services/Services';
import { FC } from 'react';
import { BaseTextField } from '../../TextFields/BaseTextField';

type CreateServiceFormProps = {
  request: CreateServiceRequest;
  setRequest: (request: CreateServiceRequest) => void;
};

export const CreateServiceForm: FC<CreateServiceFormProps> = (props) => {
  const { request, setRequest } = props;

  const onRequest =
    <T,>(key: keyof CreateServiceRequest) =>
    (value: T) => {
      setRequest({ ...request, [key]: value });
    };

  return (
    <Box>
      <BaseTextField sx={{ mt: 0 }} value={request.url} onChange={onRequest('url')} label={'URL'} />
      <BaseTextField value={request.name} onChange={onRequest('name')} label={'Name'} />
      <BaseTextField value={request.cluster} onChange={onRequest('cluster')} label={'Cluster'} />
      <BaseTextField value={request.namespace} onChange={onRequest('namespace')} label={'Namespace'} />
    </Box>
  );
};
