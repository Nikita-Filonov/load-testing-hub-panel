import React, { FC, PropsWithChildren, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MethodsAnalyticsHTTPClient } from '../../Services/Clients/Analytics/MethodsAnalyticsHTTPClient';
import {
  setMethodsNumberOfRequestsAnalytics,
  setMethodsRequestsPerSecondAnalytics,
  setMethodsResponseTimesAnalytics
} from '../../Redux/Analytics/AnalyticsSlice';
import { GetMethodsAnalyticsQuery } from '../../Models/Analytics/MethodsAnalytics';

interface Loading {
  getResponseTimesAnalytics: boolean;
  getNumberOfRequestsAnalytics: boolean;
  getRequestsPerSecondAnalytics: boolean;
}

export type MethodsAnalyticsContextProps = {
  loading: Loading;
  getResponseTimesAnalytics: (query: GetMethodsAnalyticsQuery) => Promise<void>;
  getNumberOfRequestsAnalytics: (query: GetMethodsAnalyticsQuery) => Promise<void>;
  getRequestsPerSecondAnalytics: (query: GetMethodsAnalyticsQuery) => Promise<void>;
};

const MethodsAnalyticsContext = React.createContext<MethodsAnalyticsContextProps | null>(null);

const MethodsAnalyticsProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const methodsAnalyticsHTTPClient = new MethodsAnalyticsHTTPClient();
  const [loading, setLoading] = useState<Loading>({
    getResponseTimesAnalytics: false,
    getNumberOfRequestsAnalytics: false,
    getRequestsPerSecondAnalytics: false
  });

  const getResponseTimesAnalyticsAPI = async (query: GetMethodsAnalyticsQuery) => {
    setLoading({ ...loading, getResponseTimesAnalytics: true });
    const response = await methodsAnalyticsHTTPClient.getResponseTimesAnalytics(query);
    response && dispatch(setMethodsResponseTimesAnalytics(response.analytics));
    setLoading({ ...loading, getResponseTimesAnalytics: false });
  };

  const getNumberOfRequestsAnalyticsAPI = async (query: GetMethodsAnalyticsQuery) => {
    setLoading({ ...loading, getNumberOfRequestsAnalytics: true });
    const response = await methodsAnalyticsHTTPClient.getNumberOfRequestsAnalytics(query);
    response && dispatch(setMethodsNumberOfRequestsAnalytics(response.analytics));
    setLoading({ ...loading, getNumberOfRequestsAnalytics: false });
  };

  const getRequestsPerSecondAnalyticsAPI = async (query: GetMethodsAnalyticsQuery) => {
    setLoading({ ...loading, getRequestsPerSecondAnalytics: true });
    const response = await methodsAnalyticsHTTPClient.getRequestsPerSecondAnalytics(query);
    response && dispatch(setMethodsRequestsPerSecondAnalytics(response.analytics));
    setLoading({ ...loading, getRequestsPerSecondAnalytics: false });
  };

  return (
    <MethodsAnalyticsContext.Provider
      value={{
        loading,
        getResponseTimesAnalytics: getResponseTimesAnalyticsAPI,
        getNumberOfRequestsAnalytics: getNumberOfRequestsAnalyticsAPI,
        getRequestsPerSecondAnalytics: getRequestsPerSecondAnalyticsAPI
      }}>
      {children}
    </MethodsAnalyticsContext.Provider>
  );
};

const useMethodsAnalytics = () => {
  const event = useContext(MethodsAnalyticsContext);
  if (event == null) {
    throw new Error('useMethodsAnalytics() called outside of a MethodsAnalyticsProvider?');
  }
  return event;
};

export { MethodsAnalyticsProvider, useMethodsAnalytics };
