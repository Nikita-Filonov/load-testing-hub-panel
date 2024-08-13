import React, { FC, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ServicesHTTPClient } from '../../Services/Clients/Services/ServicesHTTPClient';
import { setService, setServices, setSettingsServices } from '../../Redux/Services/Services/ServicesSlice';
import { useServicesSearchParams } from '../../Services/Services/Hooks';

interface Loading {
  getService: boolean;
  getServices: boolean;
  getSettingsServices: boolean;
}

export type ServicesContextProps = {
  loading: Loading;
  getServices: () => Promise<void>;
  getSettingsServices: () => Promise<void>;
};

const ServicesContext = React.createContext<ServicesContextProps | null>(null);

const ServicesProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const servicesHTTPClient = new ServicesHTTPClient();
  const { serviceName, removeServiceName } = useServicesSearchParams();
  const [loading, setLoading] = useState<Loading>({
    getService: false,
    getServices: false,
    getSettingsServices: false
  });

  useEffect(() => {
    serviceName && getServiceAPI(serviceName);
  }, [serviceName]);

  const getServiceAPI = async (name: string) => {
    setLoading({ ...loading, getService: true });
    const response = await servicesHTTPClient.getService(name);

    if (response) {
      dispatch(setService(response.service));
      removeServiceName();
    }

    setLoading({ ...loading, getService: false });
  };

  const getServicesAPI = async () => {
    setLoading({ ...loading, getServices: true });
    const response = await servicesHTTPClient.getServices({ withInternal: true });
    response && dispatch(setServices(response.services));
    setLoading({ ...loading, getServices: false });
  };

  const getSettingsServicesAPI = async () => {
    setLoading({ ...loading, getSettingsServices: true });
    const response = await servicesHTTPClient.getServices({ withInternal: false });
    response && dispatch(setSettingsServices(response.services));
    setLoading({ ...loading, getSettingsServices: false });
  };

  return (
    <ServicesContext.Provider
      value={{
        loading,
        getServices: getServicesAPI,
        getSettingsServices: getSettingsServicesAPI
      }}>
      {children}
    </ServicesContext.Provider>
  );
};

const useServices = () => {
  const event = useContext(ServicesContext);
  if (event == null) {
    throw new Error('useServices() called outside of a ServicesProvider?');
  }
  return event;
};

export { ServicesProvider, useServices };
