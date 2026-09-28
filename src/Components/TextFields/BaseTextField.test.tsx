import { expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BaseTextField } from './BaseTextField';
import { BaseNumberTextField } from './BaseNumberTextField';

it('keeps adornments and input limits after the MUI migration', () => {
  const onChange = vi.fn();

  render(<BaseTextField
    value="old"
    onChange={onChange}
    label="Service name"
    maxLength={10}
    startAdornment={<span>prefix</span>}
  />);

  const input = screen.getByLabelText('Service name');
  expect(input).toHaveAttribute('maxlength', '10');
  expect(screen.getByText('prefix')).toBeInTheDocument();
  fireEvent.change(input, { target: { value: 'new' } });
  expect(onChange).toHaveBeenCalledWith('new');
});

it('converts number input changes to numeric values', () => {
  const onChange = vi.fn();

  render(<BaseNumberTextField value={1} onChange={onChange} label="Users" />);
  fireEvent.change(screen.getByLabelText('Users'), { target: { value: '42' } });

  expect(onChange).toHaveBeenCalledWith(42);
});
