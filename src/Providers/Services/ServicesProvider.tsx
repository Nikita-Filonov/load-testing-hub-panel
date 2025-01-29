import React, { FC, PropsWithChildren, useContext } from 'react';
import { ServicesHTTPClient } from '../../Services/Clients/Services/ServicesHTTPClient';
import {
  createService,
  deleteService,
  setService,
  setServiceDetails,
  setServices,
  updateService
} from '../../Redux/Services/Services/Slice';
import {
  CreateServiceRequest,
  GetServiceDetailsResponse,
  GetServiceResponse,
  GetServicesResponse,
  UpdateServiceRequest
} from '../../Models/Services/Services';
import { useDispatch } from 'react-redux';
import { APIResponse } from '../../Services/Clients/Models';
import { useAPIResponseHandler } from '../../Services/Clients/Hooks';

export enum ServicesErrorKey {
  CreateService = 'ServicesProvider/createService',
  UpdateService = 'ServicesProvider/updateService'
}

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
  getService: (serviceId: number) => Promise<APIResponse<GetServiceResponse>>;
  getServices: () => Promise<APIResponse<GetServicesResponse>>;
  createService: (request: CreateServiceRequest) => Promise<APIResponse<GetServiceDetailsResponse>>;
  updateService: (serviceId: number, request: UpdateServiceRequest) => Promise<APIResponse<GetServiceDetailsResponse>>;
  deleteService: (serviceId: number) => Promise<APIResponse>;
  getServiceDetails: (serviceId: number) => Promise<APIResponse<GetServiceDetailsResponse>>;
};

const ServicesContext = React.createContext<ServicesContextProps | null>(null);

const ServicesProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const { loading, handleAPIResponse } = useAPIResponseHandler({
    provider: ServicesProvider.name,
    defaultLoading: {
      getService: false,
      getServices: false,
      createService: false,
      updateService: false,
      deleteService: false,
      getServiceDetails: false
    }
  });
  const servicesHTTPClient = new ServicesHTTPClient();

  const getServiceAPI = async (serviceId: number) => {
    return await handleAPIResponse({
      key: 'getService',
      call: servicesHTTPClient.getService(serviceId),
      handler: (response) => dispatch(setService(response.service))
    });
  };

  const getServicesAPI = async () => {
    return await handleAPIResponse({
      key: 'getServices',
      call: servicesHTTPClient.getServices(),
      handler: (response) => dispatch(setServices(response.services))
    });
  };

  const createServiceAPI = async (request: CreateServiceRequest) => {
    return await handleAPIResponse({
      key: 'createService',
      call: servicesHTTPClient.createService(request),
      handler: (response) => dispatch(createService(response.details))
    });
  };

  const updateServiceAPI = async (serviceId: number, request: UpdateServiceRequest) => {
    return await handleAPIResponse({
      key: 'updateService',
      call: servicesHTTPClient.updateService(serviceId, request),
      handler: (response) => dispatch(updateService(response.details))
    });
  };

  const deleteServiceAPI = async (serviceId: number) => {
    return await handleAPIResponse({
      key: 'deleteService',
      call: servicesHTTPClient.deleteService(serviceId),
      handler: () => dispatch(deleteService({ serviceId }))
    });
  };

  const getServiceDetailsAPI = async (serviceId: number) => {
    return await handleAPIResponse({
      key: 'getServiceDetails',
      call: servicesHTTPClient.getServiceDetails(serviceId),
      handler: (response) => dispatch(setServiceDetails(response.details))
    });
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
