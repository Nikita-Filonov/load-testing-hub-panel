import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

export const useServicesSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const serviceName = useMemo(() => searchParams.get('serviceName'), [searchParams]);

  const removeServiceName = () => {
    searchParams.delete('serviceName');
    setSearchParams((prev) => ({ ...prev, ...searchParams }));
  };

  return { serviceName, removeServiceName };
};

export const useScenariosSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const scenarioName = useMemo(() => searchParams.get('scenarioName'), [searchParams]);

  const removeScenarioName = () => {
    searchParams.delete('scenarioName');
    setSearchParams((prev) => ({ ...prev, ...searchParams }));
  };

  return { scenarioName, removeScenarioName };
};
