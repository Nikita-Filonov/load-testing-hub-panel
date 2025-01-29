import React, { FC, PropsWithChildren, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { MethodsHTTPClient } from '../../Services/Clients/Methods/MethodsHTTPClient';
import {
  GetMethodDetailsQuery,
  GetMethodDetailsResponse,
  GetMethodsQuery,
  GetMethodsResponse,
  GetShortMethodsQuery,
  GetShortMethodsResponse
} from '../../Models/Methods/Methods';
import {
  setMethodDetails,
  setMethodDetailsNumberOfRequestsAnalytics,
  setMethodDetailsPercentilesAnalytics,
  setMethodDetailsRequestsPerSecondAnalytics,
  setMethodDetailsResponseTimesAnalytics,
  setMethods,
  setShortMethods
} from '../../Redux/Methods/Slice';
import { GetMethodDetailsAnalyticsQuery } from '../../Models/Methods/Analytics';
import { useAPIResponseHandler } from '../../Services/Clients/Hooks';
import { APIResponse } from '../../Services/Clients/Models';
import { GetPercentilesAnalyticsResponse } from '../../Models/Analytics/PercentilesAnalytics';
import { GetResponseTimesAnalyticsResponse } from '../../Models/Analytics/ResponseTimesAnalytics';
import { GetNumberOfRequestsAnalyticsResponse } from '../../Models/Analytics/NumberOfRequestsAnalytics';
import { GetRequestsPerSecondAnalyticsResponse } from '../../Models/Analytics/RequestsPerSecondAnalytics';

interface Loading {
  getMethods: boolean;
  getShortMethods: boolean;
  getMethodDetails: boolean;
  getMethodDetailsPercentilesAnalytics: boolean;
  getMethodDetailsResponseTimesAnalytics: boolean;
  getMethodDetailsNumberOfRequestsAnalytics: boolean;
  getMethodDetailsRequestsPerSecondAnalytics: boolean;
}

export type MethodsContextProps = {
  loading: Loading;
  getMethods: (query: GetMethodsQuery) => Promise<APIResponse<GetMethodsResponse>>;
  getShortMethods: (query: GetShortMethodsQuery) => Promise<APIResponse<GetShortMethodsResponse>>;
  getMethodDetails: (query: GetMethodDetailsQuery) => Promise<APIResponse<GetMethodDetailsResponse>>;
  getMethodDetailsPercentilesAnalytics: (
    query: GetMethodDetailsAnalyticsQuery
  ) => Promise<APIResponse<GetPercentilesAnalyticsResponse>>;
  getMethodDetailsResponseTimesAnalytics: (
    query: GetMethodDetailsAnalyticsQuery
  ) => Promise<APIResponse<GetResponseTimesAnalyticsResponse>>;
  getMethodDetailsNumberOfRequestsAnalytics: (
    query: GetMethodDetailsAnalyticsQuery
  ) => Promise<APIResponse<GetNumberOfRequestsAnalyticsResponse>>;
  getMethodDetailsRequestsPerSecondAnalytics: (
    query: GetMethodDetailsAnalyticsQuery
  ) => Promise<APIResponse<GetRequestsPerSecondAnalyticsResponse>>;
};

const MethodsContext = React.createContext<MethodsContextProps | null>(null);

const MethodsProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const { loading, handleAPIResponse } = useAPIResponseHandler({
    provider: MethodsProvider.name,
    defaultLoading: {
      getMethods: false,
      getShortMethods: false,
      getMethodDetails: false,
      getMethodDetailsPercentilesAnalytics: false,
      getMethodDetailsResponseTimesAnalytics: false,
      getMethodDetailsNumberOfRequestsAnalytics: false,
      getMethodDetailsRequestsPerSecondAnalytics: false
    }
  });
  const methodsHTTPClient = new MethodsHTTPClient();

  const getMethodsAPI = async (query: GetMethodsQuery) => {
    return await handleAPIResponse({
      key: 'getMethods',
      call: methodsHTTPClient.getMethods(query),
      handler: (response) => dispatch(setMethods(response.methods))
    });
  };

  const getShortMethodsAPI = async (query: GetShortMethodsQuery) => {
    return await handleAPIResponse({
      key: 'getShortMethods',
      call: methodsHTTPClient.getShortMethods(query),
      handler: (response) => dispatch(setShortMethods(response.methods))
    });
  };

  const getMethodDetailsAPI = async (query: GetMethodDetailsQuery) => {
    return await handleAPIResponse({
      key: 'getMethodDetails',
      call: methodsHTTPClient.getMethodDetails(query),
      handler: (response) => dispatch(setMethodDetails(response.details))
    });
  };

  const getMethodDetailsPercentilesAnalyticsAPI = async (query: GetMethodDetailsAnalyticsQuery) => {
    return await handleAPIResponse({
      key: 'getMethodDetailsPercentilesAnalytics',
      call: methodsHTTPClient.getMethodDetailsPercentilesAnalytics(query),
      handler: (response) => dispatch(setMethodDetailsPercentilesAnalytics(response.analytics))
    });
  };

  const getMethodDetailsResponseTimesAnalyticsAPI = async (query: GetMethodDetailsAnalyticsQuery) => {
    return await handleAPIResponse({
      key: 'getMethodDetailsResponseTimesAnalytics',
      call: methodsHTTPClient.getMethodDetailsResponseTimesAnalytics(query),
      handler: (response) => dispatch(setMethodDetailsResponseTimesAnalytics(response.analytics))
    });
  };

  const getMethodDetailsNumberOfRequestsAnalyticsAPI = async (query: GetMethodDetailsAnalyticsQuery) => {
    return await handleAPIResponse({
      key: 'getMethodDetailsNumberOfRequestsAnalytics',
      call: methodsHTTPClient.getMethodDetailsNumberOfRequestsAnalytics(query),
      handler: (response) => dispatch(setMethodDetailsNumberOfRequestsAnalytics(response.analytics))
    });
  };

  const getMethodDetailsRequestsPerSecondAnalyticsAPI = async (query: GetMethodDetailsAnalyticsQuery) => {
    return await handleAPIResponse({
      key: 'getMethodDetailsRequestsPerSecondAnalytics',
      call: methodsHTTPClient.getMethodDetailsRequestsPerSecondAnalytics(query),
      handler: (response) => dispatch(setMethodDetailsRequestsPerSecondAnalytics(response.analytics))
    });
  };

  return (
    <MethodsContext.Provider
      value={{
        loading,
        getMethods: getMethodsAPI,
        getShortMethods: getShortMethodsAPI,
        getMethodDetails: getMethodDetailsAPI,
        getMethodDetailsPercentilesAnalytics: getMethodDetailsPercentilesAnalyticsAPI,
        getMethodDetailsResponseTimesAnalytics: getMethodDetailsResponseTimesAnalyticsAPI,
        getMethodDetailsNumberOfRequestsAnalytics: getMethodDetailsNumberOfRequestsAnalyticsAPI,
        getMethodDetailsRequestsPerSecondAnalytics: getMethodDetailsRequestsPerSecondAnalyticsAPI
      }}>
      {children}
    </MethodsContext.Provider>
  );
};

const useMethods = () => {
  const event = useContext(MethodsContext);
  if (event == null) {
    throw new Error('useMethods() called outside of a MethodsProvider?');
  }
  return event;
};

export { MethodsProvider, useMethods };
