import { RatioResultsInitialState } from './Results/RatioResults/InitialState';
import { CoreInitialState } from './Core/InitialState';
import { AnalyticsInitialState } from './Analytics/InitialState';
import { ServicesInitialState } from './Services/Services/InitialState';
import { MethodResultsInitialState } from './Results/MethodResults/InitialState';
import { LoadTestResultsInitialState } from './Results/LoadTestResults/InitialState';
import { HistoryResultsInitialState } from './Results/HistoryResults/InitialState';
import { MethodsInitialState } from './Results/Methods/InitialState';
import { ScenariosInitialState } from './Services/Scenarios/InitialState';

export interface ReduxState {
  core: CoreInitialState;
  methods: MethodsInitialState;
  services: ServicesInitialState;
  scenarios: ScenariosInitialState;
  analytics: AnalyticsInitialState;
  ratioResults: RatioResultsInitialState;
  methodResults: MethodResultsInitialState;
  historyResults: HistoryResultsInitialState;
  loadTestResults: LoadTestResultsInitialState;
}
