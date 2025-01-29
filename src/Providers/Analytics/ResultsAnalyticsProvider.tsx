import React, { FC, PropsWithChildren, useContext } from 'react';
import { useDispatch } from 'react-redux';
import {
  setResultsNumberOfRequestsAnalytics,
  setResultsPercentilesAnalytics,
  setResultsRequestsPerSecondAnalytics,
  setResultsResponseTimesAnalytics
} from '../../Redux/Analytics/Slice';
import { ResultsAnalyticsHTTPClient } from '../../Services/Clients/Analytics/ResultsAnalyticsHTTPClient';
import { GetResultsAnalyticsQuery } from '../../Models/Analytics/ResultsAnalytics';
import { useAPIResponseHandler } from '../../Services/Clients/Hooks';
import { APIResponse } from '../../Services/Clients/Models';
import { GetPercentilesAnalyticsResponse } from '../../Models/Analytics/PercentilesAnalytics';
import { GetResponseTimesAnalyticsResponse } from '../../Models/Analytics/ResponseTimesAnalytics';
import { GetNumberOfRequestsAnalyticsResponse } from '../../Models/Analytics/NumberOfRequestsAnalytics';
import { GetRequestsPerSecondAnalyticsResponse } from '../../Models/Analytics/RequestsPerSecondAnalytics';

interface Loading {
  getPercentilesAnalytics: boolean;
  getResponseTimesAnalytics: boolean;
  getNumberOfRequestsAnalytics: boolean;
  getRequestsPerSecondAnalytics: boolean;
}

export type ResultsAnalyticsContextProps = {
  loading: Loading;
  getPercentilesAnalytics: (query: GetResultsAnalyticsQuery) => Promise<APIResponse<GetPercentilesAnalyticsResponse>>;
  getResponseTimesAnalytics: (
    query: GetResultsAnalyticsQuery
  ) => Promise<APIResponse<GetResponseTimesAnalyticsResponse>>;
  getNumberOfRequestsAnalytics: (
    query: GetResultsAnalyticsQuery
  ) => Promise<APIResponse<GetNumberOfRequestsAnalyticsResponse>>;
  getRequestsPerSecondAnalytics: (
    query: GetResultsAnalyticsQuery
  ) => Promise<APIResponse<GetRequestsPerSecondAnalyticsResponse>>;
};

const ResultsAnalyticsContext = React.createContext<ResultsAnalyticsContextProps | null>(null);

const ResultsAnalyticsProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const { loading, handleAPIResponse } = useAPIResponseHandler({
    provider: ResultsAnalyticsProvider.name,
    defaultLoading: {
      getPercentilesAnalytics: false,
      getResponseTimesAnalytics: false,
      getNumberOfRequestsAnalytics: false,
      getRequestsPerSecondAnalytics: false
    }
  });
  const resultsAnalyticsHTTPClient = new ResultsAnalyticsHTTPClient();

  const getPercentilesAnalyticsAPI = async (query: GetResultsAnalyticsQuery) => {
    return await handleAPIResponse({
      key: 'getPercentilesAnalytics',
      call: resultsAnalyticsHTTPClient.getPercentilesAnalytics(query),
      handler: (response) => dispatch(setResultsPercentilesAnalytics(response.analytics))
    });
  };

  const getResponseTimesAnalyticsAPI = async (query: GetResultsAnalyticsQuery) => {
    return await handleAPIResponse({
      key: 'getResponseTimesAnalytics',
      call: resultsAnalyticsHTTPClient.getResponseTimesAnalytics(query),
      handler: (response) => dispatch(setResultsResponseTimesAnalytics(response.analytics))
    });
  };

  const getNumberOfRequestsAnalyticsAPI = async (query: GetResultsAnalyticsQuery) => {
    return await handleAPIResponse({
      key: 'getNumberOfRequestsAnalytics',
      call: resultsAnalyticsHTTPClient.getNumberOfRequestsAnalytics(query),
      handler: (response) => dispatch(setResultsNumberOfRequestsAnalytics(response.analytics))
    });
  };

  const getRequestsPerSecondAnalyticsAPI = async (query: GetResultsAnalyticsQuery) => {
    return await handleAPIResponse({
      key: 'getRequestsPerSecondAnalytics',
      call: resultsAnalyticsHTTPClient.getRequestsPerSecondAnalytics(query),
      handler: (response) => dispatch(setResultsRequestsPerSecondAnalytics(response.analytics))
    });
  };

  return (
    <ResultsAnalyticsContext.Provider
      value={{
        loading,
        getPercentilesAnalytics: getPercentilesAnalyticsAPI,
        getResponseTimesAnalytics: getResponseTimesAnalyticsAPI,
        getNumberOfRequestsAnalytics: getNumberOfRequestsAnalyticsAPI,
        getRequestsPerSecondAnalytics: getRequestsPerSecondAnalyticsAPI
      }}>
      {children}
    </ResultsAnalyticsContext.Provider>
  );
};

const useResultsAnalytics = () => {
  const event = useContext(ResultsAnalyticsContext);
  if (event == null) {
    throw new Error('useResultsAnalytics() called outside of a ResultsAnalyticsProvider?');
  }
  return event;
};

export { ResultsAnalyticsProvider, useResultsAnalytics };
