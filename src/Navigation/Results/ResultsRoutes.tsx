import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ServicesDrawer } from '../../Components/Navigation/Services/ServicesDrawer';

const ResultsPage = lazy(() => import('../../Pages/Results/ResultsPage'));
const ResultDetailsPage = lazy(() => import('../../Pages/Results/ResultDetailsPage'));
const CompareResultWithResultsPage = lazy(() => import('../../Pages/Results/CompareResultWithResultsPage'));
const CompareResultWithAveragesPage = lazy(() => import('../../Pages/Results/CompareResultWithAveragesPage'));
const CompareResultWithScenarioPage = lazy(() => import('../../Pages/Results/CompareResultWithScenarioPage'));

export const ResultsRoutes = () => {
  return (
    <Routes>
      <Route element={<ServicesDrawer />}>
        <Route index element={<ResultsPage />} />
        <Route path={'/:loadTestResultId'} element={<ResultDetailsPage />} />
        <Route path={'/:loadTestResultId/compare-result-with-results'} element={<CompareResultWithResultsPage />} />
        <Route path={'/:loadTestResultId/compare-result-with-averages'} element={<CompareResultWithAveragesPage />} />
        <Route path={'/:loadTestResultId/compare-result-with-scenario'} element={<CompareResultWithScenarioPage />} />
      </Route>
    </Routes>
  );
};
