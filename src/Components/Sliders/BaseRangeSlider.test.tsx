import { expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BaseRangeSlider } from './BaseRangeSlider';

it('accepts a wider interval and prevents collapsing the selected range', () => {
  const onRange = vi.fn();
  const { rerender } = render(<BaseRangeSlider max={100} range={[20, 80]} onRange={onRange} />);
  const start = screen.getAllByRole('slider')[0];
  fireEvent.keyDown(start, { key: 'ArrowRight' });
  expect(onRange).toHaveBeenCalledWith([21, 80]);

  onRange.mockClear();
  rerender(<BaseRangeSlider max={100} range={[20, 22]} onRange={onRange} />);
  fireEvent.keyDown(screen.getAllByRole('slider')[0], { key: 'ArrowRight' });
  expect(onRange).not.toHaveBeenCalled();
});
