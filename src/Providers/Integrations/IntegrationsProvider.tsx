import React, { FC, PropsWithChildren, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IntegrationsHTTPClient } from '../../Services/Clients/Integrations/IntegrationsHTTPClient';
import {
  createIntegration,
  deleteIntegration,
  setIntegration,
  setIntegrations,
  updateIntegration
} from '../../Redux/Integrations/IntegrationsSlice';
import {
  CreateIntegrationRequest,
  GetIntegrationsQuery,
  UpdateIntegrationRequest
} from '../../Models/Integrations/Integrations';
import {
  BuildGrafanaDashboardURLResponse,
  BuildIntegrationURLRequest,
  BuildKibanaDiscoverURLResponse
} from '../../Models/Integrations/IntegrationBuilders';

interface Loading {
  getIntegration: boolean;
  getIntegrations: boolean;
  createIntegration: boolean;
  updateIntegration: boolean;
  deleteIntegration: boolean;
  buildKibanaDiscoverURL: boolean;
  buildGrafanaDiscoverURL: boolean;
}

export type IntegrationsContextProps = {
  loading: Loading;
  getIntegration: (integrationId: number) => Promise<void>;
  getIntegrations: (query: GetIntegrationsQuery) => Promise<void>;
  createIntegration: (request: CreateIntegrationRequest) => Promise<boolean>;
  updateIntegration: (integrationId: number, request: UpdateIntegrationRequest) => Promise<boolean>;
  deleteIntegration: (integrationId: number) => Promise<boolean>;
  buildKibanaDiscoverURL: (request: BuildIntegrationURLRequest) => Promise<BuildKibanaDiscoverURLResponse | null>;
  buildGrafanaDiscoverURL: (request: BuildIntegrationURLRequest) => Promise<BuildGrafanaDashboardURLResponse | null>;
};

const IntegrationsContext = React.createContext<IntegrationsContextProps | null>(null);

const IntegrationsProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const integrationsHTTPClient = new IntegrationsHTTPClient();
  const [loading, setLoading] = useState<Loading>({
    getIntegration: false,
    getIntegrations: false,
    createIntegration: false,
    updateIntegration: false,
    deleteIntegration: false,
    buildKibanaDiscoverURL: false,
    buildGrafanaDiscoverURL: false
  });

  const getIntegrationAPI = async (integrationId: number) => {
    setLoading({ ...loading, getIntegration: true });
    const response = await integrationsHTTPClient.getIntegration(integrationId);
    response && dispatch(setIntegration(response.integration));
    setLoading({ ...loading, getIntegration: false });
  };

  const getIntegrationsAPI = async (query: GetIntegrationsQuery) => {
    setLoading({ ...loading, getIntegrations: true });
    const response = await integrationsHTTPClient.getIntegrations(query);
    response && dispatch(setIntegrations(response.integrations));
    setLoading({ ...loading, getIntegrations: false });
  };

  const createIntegrationAPI = async (request: CreateIntegrationRequest) => {
    setLoading({ ...loading, createIntegration: true });
    const response = await integrationsHTTPClient.createIntegration(request);
    response && dispatch(createIntegration(response.integration));
    setLoading({ ...loading, createIntegration: false });

    return Boolean(!response);
  };

  const updateIntegrationAPI = async (integrationId: number, request: UpdateIntegrationRequest) => {
    setLoading({ ...loading, updateIntegration: true });
    const response = await integrationsHTTPClient.updateIntegration(integrationId, request);
    response && dispatch(updateIntegration(response.integration));
    setLoading({ ...loading, updateIntegration: false });

    return Boolean(!response);
  };

  const deleteIntegrationAPI = async (integrationId: number) => {
    setLoading({ ...loading, deleteIntegration: true });
    const error = await integrationsHTTPClient.deleteIntegration(integrationId);
    !error && dispatch(deleteIntegration({ integrationId }));
    setLoading({ ...loading, deleteIntegration: false });

    return error;
  };

  const buildKibanaDiscoverURL = async (request: BuildIntegrationURLRequest) => {
    setLoading({ ...loading, buildKibanaDiscoverURL: true });
    const response = await integrationsHTTPClient.buildKibanaDiscoverURL(request);
    setLoading({ ...loading, buildKibanaDiscoverURL: false });
    return response;
  };

  const buildGrafanaDiscoverURL = async (request: BuildIntegrationURLRequest) => {
    setLoading({ ...loading, buildGrafanaDiscoverURL: true });
    const response = await integrationsHTTPClient.buildGrafanaDiscoverURL(request);
    setLoading({ ...loading, buildGrafanaDiscoverURL: false });
    return response;
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
        buildKibanaDiscoverURL,
        buildGrafanaDiscoverURL
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
