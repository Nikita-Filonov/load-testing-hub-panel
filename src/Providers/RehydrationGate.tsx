import { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from '../Redux/ReduxState';

export const RehydrationGate = ({ children }: PropsWithChildren) => {
  const rehydrated = useSelector((state: ReduxState) => state.rehydrated);
  return rehydrated ? children : null;
};
