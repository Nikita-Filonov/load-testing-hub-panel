import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { ConfigHTTPClient } from '../Services/Clients/Config/ConfigHTTPClient';
import { SettingsManager } from '../Services/Config';
import { SuspenseBackdropView } from '../Components/Views/SuspenseBackdropView';

const ConfigContext = React.createContext<null>(null);

const ConfigProvider: FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const configHTTPClient = new ConfigHTTPClient();

  useEffect(() => {
    getConfig();

    // eslint-disable-next-line
  }, []);

  const getConfig = async () => {
    setLoading(true);
    const config = await configHTTPClient.getConfig();
    SettingsManager.setup(config);
    setLoading(false);
  };

  if (loading) {
    return <SuspenseBackdropView />;
  }

  return <ConfigContext.Provider value={null}>{children}</ConfigContext.Provider>;
};

export { ConfigProvider };
