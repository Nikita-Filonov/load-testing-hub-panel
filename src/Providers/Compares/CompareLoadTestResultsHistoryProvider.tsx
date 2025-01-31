import React, { FC, PropsWithChildren, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { CompareLoadTestResultsHistoryHTTPClient } from '../../Services/Clients/Compares/CompareLoadTestResultsHistoryHTTPClient';
import {
  setCompareLoadTestResultsHistoryNumberOfRequests,
  setCompareLoadTestResultsHistoryNumberOfUsers,
  setCompareLoadTestResultsHistoryRequestsPerSecond,
  setCompareLoadTestResultsHistoryResponseTimes
} from '../../Redux/Compares/CompareLoadTestResultsHistory/Slice';
import { GetCompareLoadTestResultsHistoryQuery } from '../../Models/Compares/CompareLoadTestResultsHistory';
import { useAPIResponseHandler } from '../../Services/Clients/Hooks';
import { APIResponse } from '../../Services/Clients/Models';
import {
  GetCompareResultsHistoryNumberOfRequestsResponse,
  GetCompareResultsHistoryNumberOfUsersResponse,
  GetCompareResultsHistoryRequestsPerSecondResponse,
  GetCompareResultsHistoryResponseTimesResponse
} from '../../Models/Compares/CompareResultsHistory';

export interface CompareLoadTestResultsHistoryLoading {
  getCompareLoadTestResultsHistoryResponseTimes: boolean;
  getCompareLoadTestResultsHistoryNumberOfUsers: boolean;
  getCompareLoadTestResultsHistoryNumberOfRequests: boolean;
  getCompareLoadTestResultsHistoryRequestsPerSecond: boolean;
}

export type CompareLoadTestResultsHistoryContextProps = {
  loading: CompareLoadTestResultsHistoryLoading;
  getCompareLoadTestResultsHistoryResponseTimes: (
    query: GetCompareLoadTestResultsHistoryQuery
  ) => Promise<APIResponse<GetCompareResultsHistoryResponseTimesResponse>>;
  getCompareLoadTestResultsHistoryNumberOfUsers: (
    query: GetCompareLoadTestResultsHistoryQuery
  ) => Promise<APIResponse<GetCompareResultsHistoryNumberOfUsersResponse>>;
  getCompareLoadTestResultsHistoryNumberOfRequests: (
    query: GetCompareLoadTestResultsHistoryQuery
  ) => Promise<APIResponse<GetCompareResultsHistoryNumberOfRequestsResponse>>;
  getCompareLoadTestResultsHistoryRequestsPerSecond: (
    query: GetCompareLoadTestResultsHistoryQuery
  ) => Promise<APIResponse<GetCompareResultsHistoryRequestsPerSecondResponse>>;
};

const CompareLoadTestResultsHistoryContext = React.createContext<CompareLoadTestResultsHistoryContextProps | null>(
  null
);

const CompareLoadTestResultsHistoryProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const { loading, handleAPIResponse } = useAPIResponseHandler({
    provider: 'CompareLoadTestResultsHistoryProvider',
    defaultLoading: {
      getCompareLoadTestResultsHistoryResponseTimes: false,
      getCompareLoadTestResultsHistoryNumberOfUsers: false,
      getCompareLoadTestResultsHistoryNumberOfRequests: false,
      getCompareLoadTestResultsHistoryRequestsPerSecond: false
    }
  });
  const compareLoadTestResultsHistoryHTTPClient = new CompareLoadTestResultsHistoryHTTPClient();

  const getCompareLoadTestResultsHistoryResponseTimesAPI = async (query: GetCompareLoadTestResultsHistoryQuery) => {
    return await handleAPIResponse({
      key: 'getCompareLoadTestResultsHistoryResponseTimes',
      call: compareLoadTestResultsHistoryHTTPClient.getCompareLoadTestResultsHistoryResponseTimes(query),
      handler: (response) => dispatch(setCompareLoadTestResultsHistoryResponseTimes(response.compares))
    });
  };

  const getCompareLoadTestResultsHistoryNumberOfUsersAPI = async (query: GetCompareLoadTestResultsHistoryQuery) => {
    return await handleAPIResponse({
      key: 'getCompareLoadTestResultsHistoryNumberOfUsers',
      call: compareLoadTestResultsHistoryHTTPClient.getCompareLoadTestResultsHistoryNumberOfUsers(query),
      handler: (response) => dispatch(setCompareLoadTestResultsHistoryNumberOfUsers(response.compares))
    });
  };

  const getCompareLoadTestResultsHistoryNumberOfRequestsAPI = async (query: GetCompareLoadTestResultsHistoryQuery) => {
    return await handleAPIResponse({
      key: 'getCompareLoadTestResultsHistoryNumberOfRequests',
      call: compareLoadTestResultsHistoryHTTPClient.getCompareLoadTestResultsHistoryNumberOfRequests(query),
      handler: (response) => dispatch(setCompareLoadTestResultsHistoryNumberOfRequests(response.compares))
    });
  };

  const getCompareLoadTestResultsHistoryRequestsPerSecondAPI = async (query: GetCompareLoadTestResultsHistoryQuery) => {
    return await handleAPIResponse({
      key: 'getCompareLoadTestResultsHistoryRequestsPerSecond',
      call: compareLoadTestResultsHistoryHTTPClient.getCompareLoadTestResultsHistoryRequestsPerSecond(query),
      handler: (response) => dispatch(setCompareLoadTestResultsHistoryRequestsPerSecond(response.compares))
    });
  };

  return (
    <CompareLoadTestResultsHistoryContext.Provider
      value={{
        loading,
        getCompareLoadTestResultsHistoryResponseTimes: getCompareLoadTestResultsHistoryResponseTimesAPI,
        getCompareLoadTestResultsHistoryNumberOfUsers: getCompareLoadTestResultsHistoryNumberOfUsersAPI,
        getCompareLoadTestResultsHistoryNumberOfRequests: getCompareLoadTestResultsHistoryNumberOfRequestsAPI,
        getCompareLoadTestResultsHistoryRequestsPerSecond: getCompareLoadTestResultsHistoryRequestsPerSecondAPI
      }}>
      {children}
    </CompareLoadTestResultsHistoryContext.Provider>
  );
};

const useCompareLoadTestResultsHistory = () => {
  const event = useContext(CompareLoadTestResultsHistoryContext);
  if (event == null) {
    throw new Error('useCompareLoadTestResultsHistory() called outside of a CompareLoadTestResultsHistoryProvider?');
  }
  return event;
};

export { CompareLoadTestResultsHistoryProvider, useCompareLoadTestResultsHistory };
