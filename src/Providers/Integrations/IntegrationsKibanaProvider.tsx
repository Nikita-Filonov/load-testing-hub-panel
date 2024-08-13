import React, { FC, PropsWithChildren, useContext, useState } from 'react';
import { GetIntegrationURLQuery } from '../../Models/Integrations/Integrations';
import { IntegrationsKibanaHTTPClient } from '../../Services/Clients/Integrations/IntegrationsKibanaHTTPClient';
import { GetKibanaDiscoverURLResponse } from '../../Models/Integrations/IntegrationsKibana';

interface Loading {
  getKibanaDiscoverUrl: boolean;
}

export type IntegrationsKibanaContextProps = {
  loading: Loading;
  getKibanaDiscoverUrl: (query: GetIntegrationURLQuery) => Promise<GetKibanaDiscoverURLResponse | null>;
};

const IntegrationsKibanaContext = React.createContext<IntegrationsKibanaContextProps | null>(null);

const IntegrationsKibanaProvider: FC<PropsWithChildren> = ({ children }) => {
  const integrationsKibanaHTTPClient = new IntegrationsKibanaHTTPClient();
  const [loading, setLoading] = useState<Loading>({
    getKibanaDiscoverUrl: false
  });

  const getKibanaDiscoverUrl = async (query: GetIntegrationURLQuery) => {
    setLoading({ ...loading, getKibanaDiscoverUrl: true });
    const response = await integrationsKibanaHTTPClient.getKibanaDiscoverUrl(query);
    setLoading({ ...loading, getKibanaDiscoverUrl: false });
    return response;
  };

  return (
    <IntegrationsKibanaContext.Provider value={{ loading, getKibanaDiscoverUrl }}>
      {children}
    </IntegrationsKibanaContext.Provider>
  );
};

const useIntegrationsKibana = () => {
  const event = useContext(IntegrationsKibanaContext);
  if (event == null) {
    throw new Error('useIntegrationsKibana() called outside of a IntegrationsKibanaProvider?');
  }
  return event;
};

export { IntegrationsKibanaProvider, useIntegrationsKibana };
