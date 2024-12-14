import React, { FC, PropsWithChildren, useContext, useState } from 'react';
import { ServicesHTTPClient } from '../../Services/Clients/Services/ServicesHTTPClient';
import {
  createService,
  deleteService,
  setService,
  setServiceDetails,
  setServices,
  updateService
} from '../../Redux/Services/Services/ServicesSlice';
import { CreateServiceRequest, UpdateServiceRequest } from '../../Models/Services/Services';
import { useDispatch } from 'react-redux';

interface Loading {
  getService: boolean;
  getServices: boolean;
  createService: boolean;
  updateService: boolean;
  deleteService: boolean;
  getServiceDetails: boolean;
}

export type ServicesContextProps = {
  loading: Loading;
  getService: (serviceId: number) => Promise<boolean>;
  getServices: () => Promise<void>;
  createService: (request: CreateServiceRequest) => Promise<boolean>;
  updateService: (serviceId: number, request: UpdateServiceRequest) => Promise<boolean>;
  deleteService: (serviceId: number) => Promise<boolean>;
  getServiceDetails: (serviceId: number) => Promise<void>;
};

const ServicesContext = React.createContext<ServicesContextProps | null>(null);

const ServicesProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const servicesHTTPClient = new ServicesHTTPClient();
  const [loading, setLoading] = useState<Loading>({
    getService: false,
    getServices: false,
    createService: false,
    updateService: false,
    deleteService: false,
    getServiceDetails: false
  });

  const getServiceAPI = async (serviceId: number) => {
    setLoading({ ...loading, getService: true });
    const response = await servicesHTTPClient.getService(serviceId);
    response && dispatch(setService(response.service));
    setLoading({ ...loading, getService: false });

    return Boolean(!response);
  };

  const getServicesAPI = async () => {
    setLoading({ ...loading, getServices: true });
    const response = await servicesHTTPClient.getServices();
    response && dispatch(setServices(response.services));
    setLoading({ ...loading, getServices: false });
  };

  const createServiceAPI = async (request: CreateServiceRequest) => {
    setLoading({ ...loading, createService: true });
    const response = await servicesHTTPClient.createService(request);
    response && dispatch(createService(response.service));
    setLoading({ ...loading, createService: false });

    return Boolean(!response);
  };

  const updateServiceAPI = async (serviceId: number, request: UpdateServiceRequest) => {
    setLoading({ ...loading, updateService: true });
    const response = await servicesHTTPClient.updateService(serviceId, request);
    response && dispatch(updateService(response.service));
    setLoading({ ...loading, updateService: false });

    return Boolean(!response);
  };

  const deleteServiceAPI = async (serviceId: number) => {
    setLoading({ ...loading, deleteService: true });
    const error = await servicesHTTPClient.deleteService(serviceId);
    !error && dispatch(deleteService({ serviceId }));
    setLoading({ ...loading, deleteService: false });

    return error;
  };

  const getServiceDetailsAPI = async (serviceId: number) => {
    setLoading({ ...loading, getServiceDetails: true });
    const response = await servicesHTTPClient.getServiceDetails(serviceId);
    response && dispatch(setServiceDetails(response.details));
    setLoading({ ...loading, getServiceDetails: false });
  };

  return (
    <ServicesContext.Provider
      value={{
        loading,
        getService: getServiceAPI,
        getServices: getServicesAPI,
        createService: createServiceAPI,
        updateService: updateServiceAPI,
        deleteService: deleteServiceAPI,
        getServiceDetails: getServiceDetailsAPI
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
