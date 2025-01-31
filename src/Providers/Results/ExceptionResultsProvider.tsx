import React, { FC, PropsWithChildren, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { ExceptionResultsHTTPClient } from '../../Services/Clients/Results/ExceptionResultsHTTPClient';
import {
  GetExceptionResultDetailsResponse,
  GetExceptionResultsQuery,
  GetExceptionResultsResponse
} from '../../Models/Results/ExceptionResults';
import { setExceptionResultDetails, setExceptionResults } from '../../Redux/Results/ExceptionResults/Slice';
import { useAPIResponseHandler } from '../../Services/Clients/Hooks';
import { APIResponse } from '../../Services/Clients/Models';

interface Loading {
  getExceptionResults: boolean;
  getExceptionResultDetails: boolean;
}

export type ExceptionResultsContextProps = {
  loading: Loading;
  getExceptionResults: (query: GetExceptionResultsQuery) => Promise<APIResponse<GetExceptionResultsResponse>>;
  getExceptionResultDetails: (exceptionResultId: number) => Promise<APIResponse<GetExceptionResultDetailsResponse>>;
};

const ExceptionResultsContext = React.createContext<ExceptionResultsContextProps | null>(null);

const ExceptionResultsProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const { loading, handleAPIResponse } = useAPIResponseHandler({
    provider: 'ExceptionResultsProvider',
    defaultLoading: {
      getExceptionResults: false,
      getExceptionResultDetails: false
    }
  });
  const exceptionResultsHTTPClient = new ExceptionResultsHTTPClient();

  const getExceptionResultsAPI = async (query: GetExceptionResultsQuery) => {
    return await handleAPIResponse({
      key: 'getExceptionResults',
      call: exceptionResultsHTTPClient.getExceptionResults(query),
      handler: (response) => dispatch(setExceptionResults(response.results))
    });
  };

  const getExceptionResultDetailsAPI = async (exceptionResultId: number) => {
    return await handleAPIResponse({
      key: 'getExceptionResultDetails',
      call: exceptionResultsHTTPClient.getExceptionResultDetails(exceptionResultId),
      handler: (response) => dispatch(setExceptionResultDetails(response.details))
    });
  };

  return (
    <ExceptionResultsContext.Provider
      value={{
        loading,
        getExceptionResults: getExceptionResultsAPI,
        getExceptionResultDetails: getExceptionResultDetailsAPI
      }}>
      {children}
    </ExceptionResultsContext.Provider>
  );
};

const useExceptionResults = () => {
  const event = useContext(ExceptionResultsContext);
  if (event == null) {
    throw new Error('useExceptionResults() called outside of a ExceptionResultsProvider?');
  }
  return event;
};

export { ExceptionResultsProvider, useExceptionResults };
