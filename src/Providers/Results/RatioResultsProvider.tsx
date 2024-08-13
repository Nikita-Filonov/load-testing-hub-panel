import React, { FC, PropsWithChildren, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setRatioResultsPerClass, setRatioResultsTotal } from '../../Redux/Results/RatioResults/ResultsSlice';
import { RatioResultsHTTPClient } from '../../Services/Clients/Results/RatioResultsHTTPClient';

interface Loading {
  getRatioResults: boolean;
}

export type RatioResultsContextProps = {
  loading: Loading;
  getRatioResults: (loadTestResultId: number) => Promise<void>;
};

const RatioResultsContext = React.createContext<RatioResultsContextProps | null>(null);

const RatioResultsProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const ratioResultsHTTPClient = new RatioResultsHTTPClient();
  const [loading, setLoading] = useState<Loading>({
    getRatioResults: false
  });

  const getRatioResultsAPI = async (loadTestResultId: number) => {
    setLoading({ ...loading, getRatioResults: true });
    const response = await ratioResultsHTTPClient.getRatioResults(loadTestResultId);

    if (response) {
      dispatch(setRatioResultsTotal(response.ratioTotal));
      dispatch(setRatioResultsPerClass(response.ratioPerClass));
    }

    setLoading({ ...loading, getRatioResults: false });
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
