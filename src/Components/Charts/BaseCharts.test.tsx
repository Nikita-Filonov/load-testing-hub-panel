import { afterEach, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BaseBarChart } from './BaseBarChart';
import { BaseLineChart } from './BaseLineChart';

class ChartResizeObserver {
  constructor(private callback: ResizeObserverCallback) {}
  observe(element: Element) {
    this.callback([{
      target: element,
      contentRect: { width: 600, height: 300 }
    } as ResizeObserverEntry], this as unknown as ResizeObserver);
  }
  unobserve() {}
  disconnect() {}
}

afterEach(() => vi.unstubAllGlobals());

it.each([
  ['bar', BaseBarChart],
  ['line', BaseLineChart]
])('renders the %s chart and its HTML legend', async (_, Chart) => {
  vi.stubGlobal('ResizeObserver', ChartResizeObserver);

  render(<div style={{ width: 600, height: 300 }}>
    <Chart xAxis={[{ data: ['first', 'second'], scaleType: 'band' }]}
      yAxis={[{ data: [10, 20], label: 'Requests' }]} />
  </div>);

  expect(await screen.findByText('Requests')).toBeInTheDocument();
});
