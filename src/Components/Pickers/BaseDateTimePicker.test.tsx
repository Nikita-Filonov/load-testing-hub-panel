import { expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BaseDateTimePicker } from './BaseDateTimePicker';

it('renders the date field with the current date-fns adapter', () => {
  render(<BaseDateTimePicker label="Started at" value={null} onChange={vi.fn()} />);

  expect(screen.getByRole('group', { name: 'Started at' })).toBeInTheDocument();
  expect(screen.getByPlaceholderText('15.06.2022')).toBeInTheDocument();
});
