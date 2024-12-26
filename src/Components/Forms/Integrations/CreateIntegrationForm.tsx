import { CreateIntegrationRequest, UpdateIntegrationRequest } from '../../../Models/Integrations/Integrations';
import Box from '@mui/material/Box';
import { BaseTextField } from '../../TextFields/BaseTextField';
import { IntegrationEnvironmentTypeSelect } from '../../Selects/Integrations/IntegrationEnvironmentTypeSelect';
import { Button } from '@mui/material';
import AutoFillServiceModal from '../../Modals/Services/AutoFillServiceModal';
import { useState } from 'react';
import { ServiceDetails } from '../../../Models/Services/Services';

type CreateIntegrationFormProps<T extends UpdateIntegrationRequest> = {
  request: T;
  setRequest: (request: T) => void;
};

export const CreateIntegrationForm = <T extends UpdateIntegrationRequest>(props: CreateIntegrationFormProps<T>) => {
  const { request, setRequest } = props;
  const [autoFillServiceModal, setAutoFillServiceModal] = useState(false);

  const onRequest =
    <T,>(key: keyof CreateIntegrationRequest) =>
    (value: T) => {
      setRequest({ ...request, [key]: value });
    };

  const onAutoFillService = () => setAutoFillServiceModal(true);

  const onAutoFillServiceCallback = (details: ServiceDetails) => {
    setRequest({ ...request, name: details.name, cluster: details.cluster, namespace: details.namespace });
  };

  return (
    <Box>
      <BaseTextField sx={{ mt: 0 }} value={request.name} onChange={onRequest('name')} label={'Name'} />
      <BaseTextField value={request.cluster} onChange={onRequest('cluster')} label={'Cluster'} />
      <BaseTextField value={request.namespace} onChange={onRequest('namespace')} label={'Namespace'} />
      <IntegrationEnvironmentTypeSelect type={request.environmentType} onSelectType={onRequest('environmentType')} />
      <Button sx={{ mt: 3 }} size={'small'} variant={'outlined'} onClick={onAutoFillService}>
        Autofill
      </Button>
      <AutoFillServiceModal
        modal={autoFillServiceModal}
        setModal={setAutoFillServiceModal}
        onCallback={onAutoFillServiceCallback}
      />
    </Box>
  );
};
