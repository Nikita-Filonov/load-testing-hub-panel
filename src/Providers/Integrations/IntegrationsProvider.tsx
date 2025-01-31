import React, { FC, PropsWithChildren, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { IntegrationsHTTPClient } from '../../Services/Clients/Integrations/IntegrationsHTTPClient';
import {
  createIntegration,
  deleteIntegration,
  setIntegration,
  setIntegrations,
  setShortIntegrations,
  updateIntegration
} from '../../Redux/Integrations/Slice';
import {
  CreateIntegrationRequest,
  GetIntegrationResponse,
  GetIntegrationsQuery,
  GetIntegrationsResponse,
  GetShortIntegrationsResponse,
  UpdateIntegrationRequest
} from '../../Models/Integrations/Integrations';
import { BuildIntegrationURLRequest, BuildIntegrationURLResponse } from '../../Models/Integrations/IntegrationBuilders';
import { APIResponse } from '../../Services/Clients/Models';
import { useAPIResponseHandler } from '../../Services/Clients/Hooks';

export enum IntegrationsErrorKey {
  CreateIntegration = 'IntegrationsProvider/createIntegration',
  UpdateIntegration = 'IntegrationsProvider/updateIntegration'
}

interface Loading {
  getIntegration: boolean;
  getIntegrations: boolean;
  createIntegration: boolean;
  updateIntegration: boolean;
  deleteIntegration: boolean;
  buildIntegrationURL: boolean;
  getShortIntegrations: boolean;
}

export type IntegrationsContextProps = {
  loading: Loading;
  getIntegration: (integrationId: number) => Promise<APIResponse<GetIntegrationResponse>>;
  getIntegrations: (query: GetIntegrationsQuery) => Promise<APIResponse<GetIntegrationsResponse>>;
  createIntegration: (request: CreateIntegrationRequest) => Promise<APIResponse<GetIntegrationResponse>>;
  updateIntegration: (
    integrationId: number,
    request: UpdateIntegrationRequest
  ) => Promise<APIResponse<GetIntegrationResponse>>;
  deleteIntegration: (integrationId: number) => Promise<APIResponse>;
  buildIntegrationURL: (request: BuildIntegrationURLRequest) => Promise<APIResponse<BuildIntegrationURLResponse>>;
  getShortIntegrations: (query: GetIntegrationsQuery) => Promise<APIResponse<GetShortIntegrationsResponse>>;
};

const IntegrationsContext = React.createContext<IntegrationsContextProps | null>(null);

const IntegrationsProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const { loading, handleAPIResponse } = useAPIResponseHandler({
    provider: 'IntegrationsProvider',
    defaultLoading: {
      getIntegration: false,
      getIntegrations: false,
      createIntegration: false,
      updateIntegration: false,
      deleteIntegration: false,
      buildIntegrationURL: false,
      getShortIntegrations: false
    }
  });
  const integrationsHTTPClient = new IntegrationsHTTPClient();

  const getIntegrationAPI = async (integrationId: number) => {
    return await handleAPIResponse({
      key: 'getIntegration',
      call: integrationsHTTPClient.getIntegration(integrationId),
      handler: (response) => dispatch(setIntegration(response.integration))
    });
  };

  const getIntegrationsAPI = async (query: GetIntegrationsQuery) => {
    return await handleAPIResponse({
      key: 'getIntegrations',
      call: integrationsHTTPClient.getIntegrations(query),
      handler: (response) => dispatch(setIntegrations(response.integrations))
    });
  };

  const createIntegrationAPI = async (request: CreateIntegrationRequest) => {
    return await handleAPIResponse({
      key: 'createIntegration',
      call: integrationsHTTPClient.createIntegration(request),
      handler: (response) => dispatch(createIntegration(response.integration))
    });
  };

  const updateIntegrationAPI = async (integrationId: number, request: UpdateIntegrationRequest) => {
    return await handleAPIResponse({
      key: 'updateIntegration',
      call: integrationsHTTPClient.updateIntegration(integrationId, request),
      handler: (response) => dispatch(updateIntegration(response.integration))
    });
  };

  const deleteIntegrationAPI = async (integrationId: number) => {
    return await handleAPIResponse({
      key: 'deleteIntegration',
      call: integrationsHTTPClient.deleteIntegration(integrationId),
      handler: () => dispatch(deleteIntegration({ integrationId }))
    });
  };

  const buildIntegrationURL = async (request: BuildIntegrationURLRequest) => {
    return await handleAPIResponse({
      key: 'buildIntegrationURL',
      call: integrationsHTTPClient.buildIntegrationURL(request)
    });
  };

  const getShortIntegrationsAPI = async (query: GetIntegrationsQuery) => {
    return await handleAPIResponse({
      key: 'getShortIntegrations',
      call: integrationsHTTPClient.getShortIntegrations(query),
      handler: (response) => dispatch(setShortIntegrations(response.integrations))
    });
  };

  return (
    <IntegrationsContext.Provider
      value={{
        loading,
        getIntegration: getIntegrationAPI,
        getIntegrations: getIntegrationsAPI,
        createIntegration: createIntegrationAPI,
        updateIntegration: updateIntegrationAPI,
        deleteIntegration: deleteIntegrationAPI,
        buildIntegrationURL,
        getShortIntegrations: getShortIntegrationsAPI
      }}>
      {children}
    </IntegrationsContext.Provider>
  );
};

const useIntegrations = () => {
  const event = useContext(IntegrationsContext);
  if (event == null) {
    throw new Error('useIntegrations() called outside of a IntegrationsProvider?');
  }
  return event;
};

export { IntegrationsProvider, useIntegrations };
