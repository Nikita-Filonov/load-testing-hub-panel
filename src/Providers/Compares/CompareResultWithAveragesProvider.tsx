import React, { FC, PropsWithChildren, useContext } from 'react';
import { useDispatch } from 'react-redux';
import {
  GetCompareResultWithAveragesQuery,
  GetCompareResultWithAveragesResponse
} from '../../Models/Compares/CompareResultWithAverages';
import { CompareResultWithAveragesHTTPClient } from '../../Services/Clients/Compares/CompareResultWithAveragesHTTPClient';
import { setCompareResultWithAverages } from '../../Redux/Compares/CompareResultWithAverages/Slice';
import { useAPIResponseHandler } from '../../Services/Clients/Hooks';
import { APIResponse } from '../../Services/Clients/Models';

interface Loading {
  getCompareResultWithAverages: boolean;
}

export type CompareResultWithAveragesContextProps = {
  loading: Loading;
  getCompareResultWithAverages: (
    query: GetCompareResultWithAveragesQuery
  ) => Promise<APIResponse<GetCompareResultWithAveragesResponse>>;
};

const CompareResultWithAveragesContext = React.createContext<CompareResultWithAveragesContextProps | null>(null);

const CompareResultWithAveragesProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const { loading, handleAPIResponse } = useAPIResponseHandler({
    provider: CompareResultWithAveragesProvider.name,
    defaultLoading: { getCompareResultWithAverages: false }
  });
  const compareResultWithAveragesHTTPClient = new CompareResultWithAveragesHTTPClient();

  const getCompareResultWithAveragesAPI = async (query: GetCompareResultWithAveragesQuery) => {
    return await handleAPIResponse({
      key: 'getCompareResultWithAverages',
      call: compareResultWithAveragesHTTPClient.getCompareResultWithAverages(query),
      handler: (response) => dispatch(setCompareResultWithAverages(response.compare))
    });
  };

  return (
    <CompareResultWithAveragesContext.Provider
      value={{ loading, getCompareResultWithAverages: getCompareResultWithAveragesAPI }}>
      {children}
    </CompareResultWithAveragesContext.Provider>
  );
};

const useCompareResultWithAverages = () => {
  const event = useContext(CompareResultWithAveragesContext);
  if (event == null) {
    throw new Error('useCompareResultWithAverages() called outside of a CompareResultWithAveragesProvider?');
  }
  return event;
};

export { CompareResultWithAveragesProvider, useCompareResultWithAverages };
