import React, { FC, PropsWithChildren, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { setAverageAnalytics } from '../../Redux/Analytics/Slice';
import { AverageAnalyticsHTTPClient } from '../../Services/Clients/Analytics/AverageAnalyticsHTTPClient';
import { GetResultsAnalyticsQuery } from '../../Models/Analytics/ResultsAnalytics';
import { useAPIResponseHandler } from '../../Services/Clients/Hooks';
import { APIResponse } from '../../Services/Clients/Models';
import { GetAverageAnalyticsResponse } from '../../Models/Analytics/AverageAnalytics';

interface Loading {
  getAverageAnalytics: boolean;
}

export type AverageAnalyticsContextProps = {
  loading: Loading;
  getAverageAnalytics: (query: GetResultsAnalyticsQuery) => Promise<APIResponse<GetAverageAnalyticsResponse>>;
};

const AverageAnalyticsContext = React.createContext<AverageAnalyticsContextProps | null>(null);

const AverageAnalyticsProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const { loading, handleAPIResponse } = useAPIResponseHandler({
    provider: 'AverageAnalyticsProvider',
    defaultLoading: { getAverageAnalytics: false }
  });
  const averageAnalyticsHTTPClient = new AverageAnalyticsHTTPClient();

  const getAverageAnalyticsAPI = async (query: GetResultsAnalyticsQuery) => {
    return await handleAPIResponse({
      key: 'getAverageAnalytics',
      call: averageAnalyticsHTTPClient.getAverageAnalytics(query),
      handler: (response) => dispatch(setAverageAnalytics(response.analytics))
    });
  };

  return (
    <AverageAnalyticsContext.Provider value={{ loading, getAverageAnalytics: getAverageAnalyticsAPI }}>
      {children}
    </AverageAnalyticsContext.Provider>
  );
};

const useAverageAnalytics = () => {
  const event = useContext(AverageAnalyticsContext);
  if (event == null) {
    throw new Error('useAverageAnalytics() called outside of a AverageAnalyticsProvider?');
  }
  return event;
};

export { AverageAnalyticsProvider, useAverageAnalytics };
