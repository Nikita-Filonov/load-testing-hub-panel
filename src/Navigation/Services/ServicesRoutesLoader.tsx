import React from 'react';
import { useServicesRoutesLoader } from '../../Services/Services/Hooks';
import { useScenariosRoutesLoader } from '../../Services/Scenarios/Hooks';
import { SuspenseBackdropView } from '../../Components/Views/SuspenseBackdropView';
import { Outlet } from 'react-router-dom';
import { ScenariosProvider } from '../../Providers/Services/ScenariosProvider';
import { ServicesProvider } from '../../Providers/Services/ServicesProvider';

const RoutesLoader = () => {
  const { loading: loadingServices } = useServicesRoutesLoader();
  const { loading: loadingScenarios } = useScenariosRoutesLoader();

  return loadingServices || loadingScenarios ? <SuspenseBackdropView /> : <Outlet />;
};

export const ServicesRoutesLoader = () => {
  return (
    <ScenariosProvider>
      <ServicesProvider>
        <RoutesLoader />
      </ServicesProvider>
    </ScenariosProvider>
  );
};
