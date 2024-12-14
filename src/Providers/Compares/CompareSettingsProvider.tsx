import React, { FC, PropsWithChildren, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UpdateCompareSettingsRequest } from '../../Models/Compares/CompareSettings';
import { CompareSettingsHTTPClient } from '../../Services/Clients/Compares/CompareSettingsHTTPClient';
import { setCompareSettings } from '../../Redux/Compares/CompareSettings/CompareSettingsSlice';

interface Loading {
  getCompareSettings: boolean;
  updateCompareSettings: boolean;
}

export type CompareSettingsContextProps = {
  loading: Loading;
  getCompareSettings: (serviceId: number) => Promise<void>;
  updateCompareSettings: (serviceId: number, request: UpdateCompareSettingsRequest) => Promise<void>;
};

const CompareSettingsContext = React.createContext<CompareSettingsContextProps | null>(null);

const CompareSettingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const compareSettingsHTTPClient = new CompareSettingsHTTPClient();
  const [loading, setLoading] = useState<Loading>({
    getCompareSettings: false,
    updateCompareSettings: false
  });

  const getCompareSettingsAPI = async (serviceId: number) => {
    setLoading((loading) => ({ ...loading, getCompareSettings: true }));
    const response = await compareSettingsHTTPClient.getCompareSettings(serviceId);
    response && dispatch(setCompareSettings(response.settings));
    setLoading((loading) => ({ ...loading, getCompareSettings: false }));
  };

  const updateCompareSettingsAPI = async (serviceId: number, request: UpdateCompareSettingsRequest) => {
    setLoading((loading) => ({ ...loading, updateCompareSettings: true }));
    const response = await compareSettingsHTTPClient.updateCompareSettings(serviceId, request);
    response && dispatch(setCompareSettings(response.settings));
    setLoading((loading) => ({ ...loading, updateCompareSettings: false }));
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
