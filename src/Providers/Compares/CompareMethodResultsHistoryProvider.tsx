import React, { FC, PropsWithChildren, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { CompareMethodResultsHistoryHTTPClient } from '../../Services/Clients/Compares/CompareMethodResultsHistoryHTTPClient';
import {
  setCompareMethodResultsHistoryNumberOfRequests,
  setCompareMethodResultsHistoryNumberOfUsers,
  setCompareMethodResultsHistoryRequestsPerSecond,
  setCompareMethodResultsHistoryResponseTimes
} from '../../Redux/Compares/CompareMethodResultsHistory/Slice';
import { GetCompareMethodResultsHistoryQuery } from '../../Models/Compares/CompareMethodResultsHistory';
import { useAPIResponseHandler } from '../../Services/Clients/Hooks';
import { APIResponse } from '../../Services/Clients/Models';
import {
  GetCompareResultsHistoryNumberOfRequestsResponse,
  GetCompareResultsHistoryNumberOfUsersResponse,
  GetCompareResultsHistoryRequestsPerSecondResponse,
  GetCompareResultsHistoryResponseTimesResponse
} from '../../Models/Compares/CompareResultsHistory';

export interface CompareMethodResultsHistoryLoading {
  getCompareMethodResultsHistoryResponseTimes: boolean;
  getCompareMethodResultsHistoryNumberOfUsers: boolean;
  getCompareMethodResultsHistoryNumberOfRequests: boolean;
  getCompareMethodResultsHistoryRequestsPerSecond: boolean;
}

export type CompareMethodResultsHistoryContextProps = {
  loading: CompareMethodResultsHistoryLoading;
  getCompareMethodResultsHistoryResponseTimes: (
    query: GetCompareMethodResultsHistoryQuery
  ) => Promise<APIResponse<GetCompareResultsHistoryResponseTimesResponse>>;
  getCompareMethodResultsHistoryNumberOfUsers: (
    query: GetCompareMethodResultsHistoryQuery
  ) => Promise<APIResponse<GetCompareResultsHistoryNumberOfUsersResponse>>;
  getCompareMethodResultsHistoryNumberOfRequests: (
    query: GetCompareMethodResultsHistoryQuery
  ) => Promise<APIResponse<GetCompareResultsHistoryNumberOfRequestsResponse>>;
  getCompareMethodResultsHistoryRequestsPerSecond: (
    query: GetCompareMethodResultsHistoryQuery
  ) => Promise<APIResponse<GetCompareResultsHistoryRequestsPerSecondResponse>>;
};

const CompareMethodResultsHistoryContext = React.createContext<CompareMethodResultsHistoryContextProps | null>(null);

const CompareMethodResultsHistoryProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const { loading, handleAPIResponse } = useAPIResponseHandler({
    provider: CompareMethodResultsHistoryProvider.name,
    defaultLoading: {
      getCompareMethodResultsHistoryResponseTimes: false,
      getCompareMethodResultsHistoryNumberOfUsers: false,
      getCompareMethodResultsHistoryNumberOfRequests: false,
      getCompareMethodResultsHistoryRequestsPerSecond: false
    }
  });
  const compareMethodResultsHistoryHTTPClient = new CompareMethodResultsHistoryHTTPClient();

  const getCompareMethodResultsHistoryResponseTimesAPI = async (query: GetCompareMethodResultsHistoryQuery) => {
    return await handleAPIResponse({
      key: 'getCompareMethodResultsHistoryResponseTimes',
      call: compareMethodResultsHistoryHTTPClient.getCompareMethodResultsHistoryResponseTimes(query),
      handler: (response) => dispatch(setCompareMethodResultsHistoryResponseTimes(response.compares))
    });
  };

  const getCompareMethodResultsHistoryNumberOfUsersAPI = async (query: GetCompareMethodResultsHistoryQuery) => {
    return await handleAPIResponse({
      key: 'getCompareMethodResultsHistoryNumberOfUsers',
      call: compareMethodResultsHistoryHTTPClient.getCompareMethodResultsHistoryNumberOfUsers(query),
      handler: (response) => dispatch(setCompareMethodResultsHistoryNumberOfUsers(response.compares))
    });
  };

  const getCompareMethodResultsHistoryNumberOfRequestsAPI = async (query: GetCompareMethodResultsHistoryQuery) => {
    return await handleAPIResponse({
      key: 'getCompareMethodResultsHistoryNumberOfRequests',
      call: compareMethodResultsHistoryHTTPClient.getCompareMethodResultsHistoryNumberOfRequests(query),
      handler: (response) => dispatch(setCompareMethodResultsHistoryNumberOfRequests(response.compares))
    });
  };

  const getCompareMethodResultsHistoryRequestsPerSecondAPI = async (query: GetCompareMethodResultsHistoryQuery) => {
    return await handleAPIResponse({
      key: 'getCompareMethodResultsHistoryRequestsPerSecond',
      call: compareMethodResultsHistoryHTTPClient.getCompareMethodResultsHistoryRequestsPerSecond(query),
      handler: (response) => dispatch(setCompareMethodResultsHistoryRequestsPerSecond(response.compares))
    });
  };

  return (
    <CompareMethodResultsHistoryContext.Provider
      value={{
        loading,
        getCompareMethodResultsHistoryResponseTimes: getCompareMethodResultsHistoryResponseTimesAPI,
        getCompareMethodResultsHistoryNumberOfUsers: getCompareMethodResultsHistoryNumberOfUsersAPI,
        getCompareMethodResultsHistoryNumberOfRequests: getCompareMethodResultsHistoryNumberOfRequestsAPI,
        getCompareMethodResultsHistoryRequestsPerSecond: getCompareMethodResultsHistoryRequestsPerSecondAPI
      }}>
      {children}
    </CompareMethodResultsHistoryContext.Provider>
  );
};

const useCompareMethodResultsHistory = () => {
  const event = useContext(CompareMethodResultsHistoryContext);
  if (event == null) {
    throw new Error('useCompareMethodResultsHistory() called outside of a CompareMethodResultsHistoryProvider?');
  }
  return event;
};

export { CompareMethodResultsHistoryProvider, useCompareMethodResultsHistory };
