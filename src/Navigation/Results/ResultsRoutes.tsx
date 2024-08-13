import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute';

const ResultsPage = lazy(() => import('../../Pages/Results/ResultsPage'));
const ResultDetailsPage = lazy(() => import('../../Pages/Results/ResultDetailsPage'));
const ResultCompareWithScenarioPage = lazy(() => import('../../Pages/Results/ResultCompareWithScenarioPage'));
const ResultCompareWithActualDataPage = lazy(() => import('../../Pages/Results/ResultCompareWithActualDataPage'));

export const ResultsRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={true} />}>
        <Route index element={<ResultsPage />} />
        <Route path={'/:loadTestResultId'} element={<ResultDetailsPage />} />
        <Route path={'/:loadTestResultId/compare-with-scenario'} element={<ResultCompareWithScenarioPage />} />
        <Route path={'/:loadTestResultId/compare-with-actual-data'} element={<ResultCompareWithActualDataPage />} />
      </Route>
    </Routes>
  );
};
