import { expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { CompareLabel } from './Compares/CompareLabel';
import { ResultCompareLabel } from './Results/ResultCompareLabel';
import { CompareExplanationTooltipView } from '../Tooltips/Compares/CompareExplainTooltipView';
import responses from '../../test/fixtures/apiResponses.json';
import { BaseCompare } from '../../Models/Compares/Compares';
import { ResultCompare } from '../../Models/Results/ResultCompare';

it('opens the weighted comparison explanation and highlights a regression', async () => {
  const compare = { ...responses['/compares/compare-averages-with-scenario'].compare, compare: -20, highlight: true } as BaseCompare;
  render(<CompareLabel compare={compare} />);
  expect(screen.getByTestId('ErrorOutlineOutlinedIcon')).toBeInTheDocument();
  fireEvent.click(screen.getByText('-20% worse than comparable'));
  expect(await screen.findByRole('tooltip')).toHaveTextContent('Explanation');
  expect(screen.getByRole('tooltip')).toHaveTextContent(compare.explanation.formula);
});

it('opens the result comparison explanation for its context', async () => {
  const compare = { ...responses['/load-test-results']['items'][0].compare.compareWithAverage,
    compare: 15, highlight: true } as ResultCompare;
  render(<ResultCompareLabel compare={compare} context="average" />);
  fireEvent.click(screen.getByText('15% better than average'));
  expect(await screen.findByRole('tooltip')).toHaveTextContent(compare.explanation.formula);
  expect(screen.getByTestId('ErrorOutlineOutlinedIcon')).toBeInTheDocument();
});

it('renders no explanation when a result has none', () => {
  const { container } = render(<CompareExplanationTooltipView />);
  expect(container).toBeEmptyDOMElement();
});
