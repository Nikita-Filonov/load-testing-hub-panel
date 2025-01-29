import { FC, Fragment, PropsWithChildren, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AppRoutes } from '../../Services/Navigation/Routing';
import { useDispatch } from 'react-redux';
import { clearScenariosState } from '../../Redux/Services/Scenarios/Slice';
import { setService } from '../../Redux/Services/Services/Slice';
import { INITIAL_SERVICES } from '../../Redux/Services/Services/InitialState';
import { clearLoadTestResultsState } from '../../Redux/Results/LoadTestResults/Slice';
import { clearMethodsState } from '../../Redux/Methods/Slice';
import { clearAnalyticsState } from '../../Redux/Analytics/Slice';
import { clearIntegrationsState } from '../../Redux/Integrations/Slice';

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
    if (location.pathname === AppRoutes.Services) {
      clearState();
    }
  }, [location.pathname]);

  return <Fragment>{children}</Fragment>;
};
