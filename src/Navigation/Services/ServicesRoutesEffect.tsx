import { FC, Fragment, PropsWithChildren, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AppRoutes } from '../../Services/Constants/Routing';
import { useDispatch } from 'react-redux';
import { clearScenariosState } from '../../Redux/Services/Scenarios/ScenariosSlice';
import { setService } from '../../Redux/Services/Services/ServicesSlice';
import { INITIAL_SERVICES } from '../../Redux/Services/Services/InitialState';
import { clearLoadTestResultsState } from '../../Redux/Results/LoadTestResults/LoadTestResultsSlice';
import { clearMethodsState } from '../../Redux/Results/Methods/MethodsSlice';
import { clearAnalyticsState } from '../../Redux/Analytics/AnalyticsSlice';
import { clearIntegrationsState } from '../../Redux/Integrations/IntegrationsSlice';

export const ServicesRoutesEffect: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const clearState = () => {
    dispatch(setService(INITIAL_SERVICES.service));
    dispatch(clearMethodsState());
    dispatch(clearAnalyticsState());
    dispatch(clearScenariosState());
    dispatch(clearIntegrationsState());
    dispatch(clearLoadTestResultsState());
  };

  useEffect(() => {
    location.pathname === AppRoutes.Services && clearState();
  }, [location.pathname]);

  return <Fragment>{children}</Fragment>;
};
