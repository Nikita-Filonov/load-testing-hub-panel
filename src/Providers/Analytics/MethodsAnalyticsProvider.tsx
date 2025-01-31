import React, { FC, PropsWithChildren, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { MethodsAnalyticsHTTPClient } from '../../Services/Clients/Analytics/MethodsAnalyticsHTTPClient';
import {
  setMethodsNumberOfRequestsAnalytics,
  setMethodsRequestsPerSecondAnalytics,
  setMethodsResponseTimesAnalytics
} from '../../Redux/Analytics/Slice';
import {
  GetMethodsAnalyticsQuery,
  GetMethodsNumberOfRequestsAnalyticsResponse,
  GetMethodsRequestsPerSecondAnalyticsResponse,
  GetMethodsResponseTimesAnalyticsResponse
} from '../../Models/Analytics/MethodsAnalytics';
import { useAPIResponseHandler } from '../../Services/Clients/Hooks';
import { APIResponse } from '../../Services/Clients/Models';

export interface MethodsAnalyticsLoading {
  getResponseTimesAnalytics: boolean;
  getNumberOfRequestsAnalytics: boolean;
  getRequestsPerSecondAnalytics: boolean;
}

export type MethodsAnalyticsContextProps = {
  loading: MethodsAnalyticsLoading;
  getResponseTimesAnalytics: (
    query: GetMethodsAnalyticsQuery
  ) => Promise<APIResponse<GetMethodsResponseTimesAnalyticsResponse>>;
  getNumberOfRequestsAnalytics: (
    query: GetMethodsAnalyticsQuery
  ) => Promise<APIResponse<GetMethodsNumberOfRequestsAnalyticsResponse>>;
  getRequestsPerSecondAnalytics: (
    query: GetMethodsAnalyticsQuery
  ) => Promise<APIResponse<GetMethodsRequestsPerSecondAnalyticsResponse>>;
};

const MethodsAnalyticsContext = React.createContext<MethodsAnalyticsContextProps | null>(null);

const MethodsAnalyticsProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const { loading, handleAPIResponse } = useAPIResponseHandler({
    provider: 'MethodsAnalyticsProvider',
    defaultLoading: {
      getResponseTimesAnalytics: false,
      getNumberOfRequestsAnalytics: false,
      getRequestsPerSecondAnalytics: false
    }
  });
  const methodsAnalyticsHTTPClient = new MethodsAnalyticsHTTPClient();

  const getResponseTimesAnalyticsAPI = async (query: GetMethodsAnalyticsQuery) => {
    return await handleAPIResponse({
      key: 'getResponseTimesAnalytics',
      call: methodsAnalyticsHTTPClient.getResponseTimesAnalytics(query),
      handler: (response) => dispatch(setMethodsResponseTimesAnalytics(response.analytics))
    });
  };

  const getNumberOfRequestsAnalyticsAPI = async (query: GetMethodsAnalyticsQuery) => {
    return await handleAPIResponse({
      key: 'getNumberOfRequestsAnalytics',
      call: methodsAnalyticsHTTPClient.getNumberOfRequestsAnalytics(query),
      handler: (response) => dispatch(setMethodsNumberOfRequestsAnalytics(response.analytics))
    });
  };

  const getRequestsPerSecondAnalyticsAPI = async (query: GetMethodsAnalyticsQuery) => {
    return await handleAPIResponse({
      key: 'getRequestsPerSecondAnalytics',
      call: methodsAnalyticsHTTPClient.getRequestsPerSecondAnalytics(query),
      handler: (response) => dispatch(setMethodsRequestsPerSecondAnalytics(response.analytics))
    });
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
