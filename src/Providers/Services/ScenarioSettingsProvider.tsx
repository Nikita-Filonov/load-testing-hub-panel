import React, { FC, PropsWithChildren, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ScenarioSettingsHTTPClient } from '../../Services/Clients/Services/ScenarioSettingsHTTPClient';
import { UpdateScenarioSettingsRequest } from '../../Models/Services/ScenarioSettings';
import { setScenarioSettings } from '../../Redux/Services/Scenarios/ScenariosSlice';

interface Loading {
  getScenarioSettings: boolean;
  updateScenarioSettings: boolean;
}

export type ServicesContextProps = {
  loading: Loading;
  getScenarioSettings: (scenario: string) => Promise<void>;
  updateScenarioSettings: (request: UpdateScenarioSettingsRequest) => Promise<boolean>;
};

const ScenarioSettingsContext = React.createContext<ServicesContextProps | null>(null);

const ScenarioSettingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const scenarioSettingsHTTPClient = new ScenarioSettingsHTTPClient();
  const [loading, setLoading] = useState<Loading>({
    getScenarioSettings: false,
    updateScenarioSettings: false
  });

  const getScenarioSettingsAPI = async (scenario: string) => {
    setLoading({ ...loading, getScenarioSettings: true });
    const response = await scenarioSettingsHTTPClient.getScenarioSettings(scenario);
    response && dispatch(setScenarioSettings(response.settings));
    setLoading({ ...loading, getScenarioSettings: false });
  };

  const updateScenarioSettingsAPI = async (request: UpdateScenarioSettingsRequest) => {
    setLoading({ ...loading, updateScenarioSettings: true });
    const response = await scenarioSettingsHTTPClient.updateScenarioSettings(request);
    response && dispatch(setScenarioSettings(response.settings));
    setLoading({ ...loading, updateScenarioSettings: false });
    return Boolean(!response);
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
