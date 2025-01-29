import React, { FC, PropsWithChildren, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { setRatioResultsPerClass, setRatioResultsTotal } from '../../Redux/Results/RatioResults/Slice';
import { RatioResultsHTTPClient } from '../../Services/Clients/Results/RatioResultsHTTPClient';
import { useAPIResponseHandler } from '../../Services/Clients/Hooks';
import { APIResponse } from '../../Services/Clients/Models';
import { GetRatioResultResponse } from '../../Models/Results/RatioResults';

interface Loading {
  getRatioResults: boolean;
}

export type RatioResultsContextProps = {
  loading: Loading;
  getRatioResults: (loadTestResultId: number) => Promise<APIResponse<GetRatioResultResponse>>;
};

const RatioResultsContext = React.createContext<RatioResultsContextProps | null>(null);

const RatioResultsProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const { loading, handleAPIResponse } = useAPIResponseHandler({
    provider: RatioResultsProvider.name,
    defaultLoading: { getRatioResults: false }
  });
  const ratioResultsHTTPClient = new RatioResultsHTTPClient();

  const getRatioResultsAPI = async (loadTestResultId: number) => {
    return await handleAPIResponse({
      key: 'getRatioResults',
      call: ratioResultsHTTPClient.getRatioResults(loadTestResultId),
      handler: (response) => {
        dispatch(setRatioResultsTotal(response.ratioTotal));
        dispatch(setRatioResultsPerClass(response.ratioPerClass));
      }
    });
  };

  return (
    <RatioResultsContext.Provider value={{ loading, getRatioResults: getRatioResultsAPI }}>
      {children}
    </RatioResultsContext.Provider>
  );
};

const useRatioResults = () => {
  const event = useContext(RatioResultsContext);
  if (event == null) {
    throw new Error('useRatioResults() called outside of a RatioResultsProvider?');
  }
  return event;
};

export { RatioResultsProvider, useRatioResults };
