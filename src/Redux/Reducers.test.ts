import { describe, expect, it } from 'vitest';
import { createAppStore } from './Store';
import apiResponses from '../test/fixtures/apiResponses.json';
import { ServiceDetails } from '../Models/Services/Services';
import { ScenarioDetails } from '../Models/Services/Scenarios';
import { Integration } from '../Models/Integrations/Integrations';
import { LoadTestResult, LoadTestResultDetails } from '../Models/Results/LoadTestResults';
import {
  clearServicesState, createService, deleteService, setService, setServiceDetails, setServices, updateService
} from './Services/Services/Slice';
import {
  clearScenariosState, createScenario, deleteScenario, setScenario, setScenarioDetails,
  setScenarios, updateScenario
} from './Services/Scenarios/Slice';
import {
  clearIntegrationsState, createIntegration, deleteIntegration, setIntegration,
  setIntegrations, setShortIntegrations, updateIntegration
} from './Integrations/Slice';
import {
  clearLoadTestResultsState, deleteLoadTestResult, setLoadTestResultDetails,
  setLoadTestResults, setLoadTestResultsTotal, updateLoadTestResult
} from './Results/LoadTestResults/Slice';
import { INITIAL_SERVICES } from './Services/Services/InitialState';
import { INITIAL_SCENARIOS } from './Services/Scenarios/InitialState';
import { INITIAL_INTEGRATIONS } from './Integrations/InitialState';
import { INITIAL_LOAD_TEST_RESULTS } from './Results/LoadTestResults/InitialState';

const service = apiResponses['/services/details/3'].details as ServiceDetails;
const scenario = apiResponses['/scenarios/details/5'].details as unknown as ScenarioDetails;
const integration = apiResponses['/integrations']["integrations"][0] as Integration;
const result = apiResponses['/load-test-results/details/64'].details as LoadTestResultDetails;

describe('Redux list and selection lifecycles', () => {
  it('keeps selected service details in sync with edits and resets selection on delete', () => {
    const store = createAppStore(null);
    const another = { ...service, id: 4, name: 'Payments' };
    store.dispatch(setServices([service]));
    store.dispatch(createService(another));
    store.dispatch(setService(service));
    store.dispatch(setServiceDetails(service));
    const renamed = { ...service, name: 'Checkout v2' };
    store.dispatch(updateService(renamed));
    expect(store.getState().services.services.map(({ name }) => name)).toEqual(['Checkout v2', 'Payments']);
    expect(store.getState().services.service.name).toBe('Checkout v2');
    expect(store.getState().services.serviceDetails.name).toBe('Checkout v2');
    store.dispatch(deleteService({ serviceId: 3 }));
    expect(store.getState().services.services).toEqual([another]);
    expect(store.getState().services.service).toEqual(INITIAL_SERVICES.service);
    store.dispatch(clearServicesState());
    expect(store.getState().services).toEqual(INITIAL_SERVICES);
  });

  it('preserves the selected scenario when another is edited, then clears a deleted selection', () => {
    const store = createAppStore(null);
    const another = { ...scenario, id: 6, name: 'Regression' };
    store.dispatch(setScenarios([scenario]));
    store.dispatch(createScenario(another));
    store.dispatch(setScenario(scenario));
    store.dispatch(setScenarioDetails(scenario));
    store.dispatch(updateScenario({ ...another, name: 'Regression v2' }));
    expect(store.getState().scenarios.scenario.name).toBe(scenario.name);
    expect(store.getState().scenarios.scenarios[1].name).toBe('Regression v2');
    store.dispatch(updateScenario({ ...scenario, name: 'Baseline v2' }));
    expect(store.getState().scenarios.scenario.name).toBe('Baseline v2');
    store.dispatch(deleteScenario({ scenarioId: 5 }));
    expect(store.getState().scenarios.scenarios).toHaveLength(1);
    expect(store.getState().scenarios.scenario).toEqual(INITIAL_SCENARIOS.scenario);
    store.dispatch(clearScenariosState());
    expect(store.getState().scenarios).toEqual(INITIAL_SCENARIOS);
  });

  it('updates integration lists and removes a deleted integration', () => {
    const store = createAppStore(null);
    const another = { ...integration, id: 92, name: 'Kibana' };
    store.dispatch(setIntegrations([integration]));
    store.dispatch(createIntegration(another));
    store.dispatch(setIntegration(integration));
    store.dispatch(setShortIntegrations([{ id: integration.id, name: integration.name,
      systemType: integration.systemType, environmentType: integration.environmentType }]));
    store.dispatch(updateIntegration({ ...integration, name: 'Grafana dashboards' }));
    expect(store.getState().integrations.integrations.map(({ name }) => name)).toEqual(['Grafana dashboards', 'Kibana']);
    expect(store.getState().integrations.shortIntegrations).toHaveLength(1);
    store.dispatch(deleteIntegration({ integrationId: 92 }));
    expect(store.getState().integrations.integrations).toHaveLength(1);
    store.dispatch(clearIntegrationsState());
    expect(store.getState().integrations).toEqual(INITIAL_INTEGRATIONS);
  });

  it('updates one result, decrements the list count on deletion, and clears stale details', () => {
    const store = createAppStore(null);
    const another = { ...result, id: 65 } as LoadTestResult;
    store.dispatch(setLoadTestResults([result, another]));
    store.dispatch(setLoadTestResultsTotal(2));
    store.dispatch(setLoadTestResultDetails(result));
    store.dispatch(updateLoadTestResult({ ...result, comment: 'Retested' }));
    expect(store.getState().loadTestResults.loadTestResults.map(({ comment }) => comment))
      .toEqual(['Retested', another.comment]);
    store.dispatch(deleteLoadTestResult({ loadTestResultId: result.id }));
    expect(store.getState().loadTestResults.loadTestResults.map(({ id }) => id)).toEqual([65]);
    expect(store.getState().loadTestResults.loadTestResultsTotal).toBe(1);
    store.dispatch(clearLoadTestResultsState());
    expect(store.getState().loadTestResults).toEqual(INITIAL_LOAD_TEST_RESULTS);
  });
});
