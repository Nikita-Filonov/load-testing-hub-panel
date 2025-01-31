import React, { FC, PropsWithChildren, useContext } from 'react';
import { useDispatch } from 'react-redux';
import {
  GetCompareAveragesWithScenarioQuery,
  GetCompareAveragesWithScenarioResponse
} from '../../Models/Compares/CompareAveragesWithScenario';
import { CompareAveragesWithScenarioHTTPClient } from '../../Services/Clients/Compares/CompareAveragesWithScenarioHTTPClient';
import { setCompareAveragesWithScenario } from '../../Redux/Compares/CompareAveragesWithScenario/Slice';
import { useAPIResponseHandler } from '../../Services/Clients/Hooks';
import { APIResponse } from '../../Services/Clients/Models';

interface Loading {
  getCompareAveragesWithScenario: boolean;
}

export type CompareAveragesWithScenarioContextProps = {
  loading: Loading;
  getCompareAveragesWithScenario: (
    query: GetCompareAveragesWithScenarioQuery
  ) => Promise<APIResponse<GetCompareAveragesWithScenarioResponse>>;
};

const CompareAveragesWithScenarioContext = React.createContext<CompareAveragesWithScenarioContextProps | null>(null);

const CompareAveragesWithScenarioProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const { loading, handleAPIResponse } = useAPIResponseHandler({
    provider: 'CompareAveragesWithScenarioProvider',
    defaultLoading: { getCompareAveragesWithScenario: false }
  });
  const compareAveragesWithScenarioHTTPClient = new CompareAveragesWithScenarioHTTPClient();

  const getCompareAveragesWithScenarioAPI = async (query: GetCompareAveragesWithScenarioQuery) => {
    return await handleAPIResponse({
      key: 'getCompareAveragesWithScenario',
      call: compareAveragesWithScenarioHTTPClient.getCompareAveragesWithScenario(query),
      handler: (response) => dispatch(setCompareAveragesWithScenario(response.compare))
    });
  };

  return (
    <CompareAveragesWithScenarioContext.Provider
      value={{ loading, getCompareAveragesWithScenario: getCompareAveragesWithScenarioAPI }}>
      {children}
    </CompareAveragesWithScenarioContext.Provider>
  );
};

const useCompareAveragesWithScenario = () => {
  const event = useContext(CompareAveragesWithScenarioContext);
  if (event == null) {
    throw new Error('useCompareAveragesWithScenario() called outside of a CompareAveragesWithScenarioProvider?');
  }
  return event;
};

export { CompareAveragesWithScenarioProvider, useCompareAveragesWithScenario };
