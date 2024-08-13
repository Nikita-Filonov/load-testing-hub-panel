import React, { FC, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ScenariosHTTPClient } from '../../Services/Clients/Services/ScenariosHTTPClient';
import { GetScenariosQuery } from '../../Models/Services/Scenarios';
import {
  setScenario,
  setScenarioDetails,
  setScenarios,
  setSettingsScenarios
} from '../../Redux/Services/Scenarios/ScenariosSlice';
import { useScenariosSearchParams } from '../../Services/Services/Hooks';

interface Loading {
  getScenario: boolean;
  getScenarios: boolean;
  getSettingsScenarios: boolean;
  getScenarioDetails: boolean;
}

export type ServicesContextProps = {
  loading: Loading;
  getScenarios: (query: GetScenariosQuery) => Promise<void>;
  getSettingsScenarios: (query: GetScenariosQuery) => Promise<void>;
  getScenarioDetails: (name: string) => Promise<void>;
};

const ScenariosContext = React.createContext<ServicesContextProps | null>(null);

const ScenariosProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const scenariosHTTPClient = new ScenariosHTTPClient();
  const { scenarioName, removeScenarioName } = useScenariosSearchParams();
  const [loading, setLoading] = useState<Loading>({
    getScenario: false,
    getScenarios: false,
    getSettingsScenarios: false,
    getScenarioDetails: false
  });

  useEffect(() => {
    scenarioName && getScenarioAPI(scenarioName);
  }, [scenarioName]);

  const getScenarioAPI = async (name: string) => {
    setLoading({ ...loading, getScenario: true });
    const response = await scenariosHTTPClient.getScenario(name);

    if (response) {
      dispatch(setScenario(response.scenario));
      removeScenarioName();
    }

    setLoading({ ...loading, getScenario: false });
  };

  const getScenariosAPI = async (query: GetScenariosQuery) => {
    setLoading({ ...loading, getScenarios: true });
    const response = await scenariosHTTPClient.getScenarios(query);
    response && dispatch(setScenarios(response.scenarios));
    setLoading({ ...loading, getScenarios: false });
  };

  const getSettingsScenariosAPI = async (query: GetScenariosQuery) => {
    setLoading({ ...loading, getSettingsScenarios: true });
    const response = await scenariosHTTPClient.getScenarios(query);
    response && dispatch(setSettingsScenarios(response.scenarios));
    setLoading({ ...loading, getSettingsScenarios: false });
  };

  const getScenarioDetailsAPI = async (name: string) => {
    setLoading({ ...loading, getScenarioDetails: true });
    const response = await scenariosHTTPClient.getScenarioDetails(name);
    response && dispatch(setScenarioDetails(response.details));
    setLoading({ ...loading, getScenarioDetails: false });
  };

  return (
    <ScenariosContext.Provider
      value={{
        loading,
        getScenarios: getScenariosAPI,
        getSettingsScenarios: getSettingsScenariosAPI,
        getScenarioDetails: getScenarioDetailsAPI
      }}>
      {children}
    </ScenariosContext.Provider>
  );
};

const useScenarios = () => {
  const event = useContext(ScenariosContext);
  if (event == null) {
    throw new Error('useScenarios() called outside of a ScenariosProvider?');
  }
  return event;
};

export { ScenariosProvider, useScenarios };
