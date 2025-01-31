import React, { FC, PropsWithChildren, useContext } from 'react';
import { useDispatch } from 'react-redux';
import {
  GetCompareResultWithResultsQuery,
  GetCompareResultWithResultsResponse
} from '../../Models/Compares/CompareResultWithResults';
import { CompareResultWithResultsHTTPClient } from '../../Services/Clients/Compares/CompareResultWithResultsHTTPClient';
import {
  setCompareResultWithResults,
  setCompareResultWithResultsAverageSummary
} from '../../Redux/Compares/CompareResultWithResults/Slice';
import { useAPIResponseHandler } from '../../Services/Clients/Hooks';
import { APIResponse } from '../../Services/Clients/Models';

interface Loading {
  getCompareResultWithResults: boolean;
}

export type CompareResultWithResultsContextProps = {
  loading: Loading;
  getCompareResultWithResults: (
    query: GetCompareResultWithResultsQuery
  ) => Promise<APIResponse<GetCompareResultWithResultsResponse>>;
};

const CompareResultWithResultsContext = React.createContext<CompareResultWithResultsContextProps | null>(null);

const CompareResultWithResultsProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const { loading, handleAPIResponse } = useAPIResponseHandler({
    provider: 'CompareResultWithResultsProvider',
    defaultLoading: { getCompareResultWithResults: false }
  });
  const compareResultWithResultsHTTPClient = new CompareResultWithResultsHTTPClient();

  const getCompareResultWithResultsAPI = async (query: GetCompareResultWithResultsQuery) => {
    return await handleAPIResponse({
      key: 'getCompareResultWithResults',
      call: compareResultWithResultsHTTPClient.getCompareResultWithResults(query),
      handler: (response) => {
        dispatch(setCompareResultWithResults(response.compares));
        dispatch(setCompareResultWithResultsAverageSummary(response.summary));
      }
    });
  };

  return (
    <CompareResultWithResultsContext.Provider
      value={{ loading, getCompareResultWithResults: getCompareResultWithResultsAPI }}>
      {children}
    </CompareResultWithResultsContext.Provider>
  );
};

const useCompareResultWithResults = () => {
  const event = useContext(CompareResultWithResultsContext);
  if (event == null) {
    throw new Error('useCompareResultWithResults() called outside of a CompareResultWithResultsProvider?');
  }
  return event;
};

export { CompareResultWithResultsProvider, useCompareResultWithResults };
