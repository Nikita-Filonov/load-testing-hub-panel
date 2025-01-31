import React, { FC, PropsWithChildren, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { GetCompareSettingsResponse, UpdateCompareSettingsRequest } from '../../Models/Compares/CompareSettings';
import { CompareSettingsHTTPClient } from '../../Services/Clients/Compares/CompareSettingsHTTPClient';
import { setCompareSettings } from '../../Redux/Compares/CompareSettings/CompareSettingsSlice';
import { APIResponse } from '../../Services/Clients/Models';
import { useAPIResponseHandler } from '../../Services/Clients/Hooks';

export enum CompareSettingsErrorKey {
  UpdateCompareSettings = 'CompareSettingsProvider/updateCompareSettings'
}

interface Loading {
  getCompareSettings: boolean;
  updateCompareSettings: boolean;
}

export type CompareSettingsContextProps = {
  loading: Loading;
  getCompareSettings: (serviceId: number) => Promise<APIResponse<GetCompareSettingsResponse>>;
  updateCompareSettings: (
    serviceId: number,
    request: UpdateCompareSettingsRequest
  ) => Promise<APIResponse<GetCompareSettingsResponse>>;
};

const CompareSettingsContext = React.createContext<CompareSettingsContextProps | null>(null);

const CompareSettingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const { loading, handleAPIResponse } = useAPIResponseHandler({
    provider: 'CompareSettingsProvider',
    defaultLoading: {
      getCompareSettings: false,
      updateCompareSettings: false
    }
  });
  const compareSettingsHTTPClient = new CompareSettingsHTTPClient();

  const getCompareSettingsAPI = async (serviceId: number) => {
    return await handleAPIResponse({
      key: 'getCompareSettings',
      call: compareSettingsHTTPClient.getCompareSettings(serviceId),
      handler: (response) => dispatch(setCompareSettings(response.settings))
    });
  };

  const updateCompareSettingsAPI = async (serviceId: number, request: UpdateCompareSettingsRequest) => {
    return await handleAPIResponse({
      key: 'updateCompareSettings',
      call: compareSettingsHTTPClient.updateCompareSettings(serviceId, request),
      handler: (response) => dispatch(setCompareSettings(response.settings))
    });
  };

  return (
    <CompareSettingsContext.Provider
      value={{
        loading,
        getCompareSettings: getCompareSettingsAPI,
        updateCompareSettings: updateCompareSettingsAPI
      }}>
      {children}
    </CompareSettingsContext.Provider>
  );
};

const useCompareSettings = () => {
  const event = useContext(CompareSettingsContext);
  if (event == null) {
    throw new Error('useCompareSettings() called outside of a CompareSettingsProvider?');
  }
  return event;
};

export { CompareSettingsProvider, useCompareSettings };
