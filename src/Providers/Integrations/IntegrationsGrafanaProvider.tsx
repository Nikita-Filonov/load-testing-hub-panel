import React, { FC, PropsWithChildren, useContext, useState } from 'react';
import { IntegrationsGrafanaHTTPClient } from '../../Services/Clients/Integrations/IntegrationsGrafanaHTTPClient';
import { GetGrafanaDashboardURLResponse } from '../../Models/Integrations/IntegrationsGrafana';
import { GetIntegrationURLQuery } from '../../Models/Integrations/Integrations';

interface Loading {
  getGrafanaDashboardUrl: boolean;
}

export type IntegrationsGrafanaContextProps = {
  loading: Loading;
  getGrafanaDashboardUrl: (query: GetIntegrationURLQuery) => Promise<GetGrafanaDashboardURLResponse | null>;
};

const IntegrationsGrafanaContext = React.createContext<IntegrationsGrafanaContextProps | null>(null);

const IntegrationsGrafanaProvider: FC<PropsWithChildren> = ({ children }) => {
  const integrationsGrafanaHTTPClient = new IntegrationsGrafanaHTTPClient();
  const [loading, setLoading] = useState<Loading>({
    getGrafanaDashboardUrl: false
  });

  const getGrafanaDashboardUrl = async (query: GetIntegrationURLQuery) => {
    setLoading({ ...loading, getGrafanaDashboardUrl: true });
    const response = await integrationsGrafanaHTTPClient.getGrafanaDashboardUrl(query);
    setLoading({ ...loading, getGrafanaDashboardUrl: false });
    return response;
  };

  return (
    <IntegrationsGrafanaContext.Provider value={{ loading, getGrafanaDashboardUrl }}>
      {children}
    </IntegrationsGrafanaContext.Provider>
  );
};

const useIntegrationsGrafana = () => {
  const event = useContext(IntegrationsGrafanaContext);
  if (event == null) {
    throw new Error('useIntegrationsGrafana() called outside of a IntegrationsGrafanaProvider?');
  }
  return event;
};

export { IntegrationsGrafanaProvider, useIntegrationsGrafana };
