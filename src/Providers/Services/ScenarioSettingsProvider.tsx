import React, { FC, PropsWithChildren, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { ScenarioSettingsHTTPClient } from '../../Services/Clients/Services/ScenarioSettingsHTTPClient';
import { GetScenarioSettingsResponse, UpdateScenarioSettingsRequest } from '../../Models/Services/ScenarioSettings';
import { setScenarioSettings } from '../../Redux/Services/Scenarios/Slice';
import { APIResponse } from '../../Services/Clients/Models';
import { useAPIResponseHandler } from '../../Services/Clients/Hooks';

interface Loading {
  getScenarioSettings: boolean;
  updateScenarioSettings: boolean;
}

export type ScenarioSettingsContextProps = {
  loading: Loading;
  getScenarioSettings: (scenarioId: number) => Promise<APIResponse<GetScenarioSettingsResponse>>;
  updateScenarioSettings: (
    scenarioId: number,
    request: UpdateScenarioSettingsRequest
  ) => Promise<APIResponse<GetScenarioSettingsResponse>>;
};

const ScenarioSettingsContext = React.createContext<ScenarioSettingsContextProps | null>(null);

const ScenarioSettingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const { loading, handleAPIResponse } = useAPIResponseHandler({
    provider: 'ScenarioSettingsProvider',
    defaultLoading: {
      getScenarioSettings: false,
      updateScenarioSettings: false
    }
  });
  const scenarioSettingsHTTPClient = new ScenarioSettingsHTTPClient();

  const getScenarioSettingsAPI = async (scenarioId: number) => {
    return await handleAPIResponse({
      key: 'getScenarioSettings',
      call: scenarioSettingsHTTPClient.getScenarioSettings(scenarioId),
      handler: (response) => dispatch(setScenarioSettings(response.settings))
    });
  };

  const updateScenarioSettingsAPI = async (scenarioId: number, request: UpdateScenarioSettingsRequest) => {
    return await handleAPIResponse({
      key: 'updateScenarioSettings',
      call: scenarioSettingsHTTPClient.updateScenarioSettings(scenarioId, request),
      handler: (response) => dispatch(setScenarioSettings(response.settings))
    });
  };

  return (
    <ScenarioSettingsContext.Provider
      value={{
        loading,
        getScenarioSettings: getScenarioSettingsAPI,
        updateScenarioSettings: updateScenarioSettingsAPI
      }}>
      {children}
    </ScenarioSettingsContext.Provider>
  );
};

const useScenarioSettings = () => {
  const event = useContext(ScenarioSettingsContext);
  if (event == null) {
    throw new Error('useScenarioSettings() called outside of a ScenarioSettingsProvider?');
  }
  return event;
};

export { ScenarioSettingsProvider, useScenarioSettings };
