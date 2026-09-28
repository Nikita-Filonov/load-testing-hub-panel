import { expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BaseMultipleAutocomplete } from './BaseMultipleAutocomplete';
import { HTMLAttributes } from 'react';

it('selects an option through the updated MUI autocomplete', async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();
  const options = [{ id: 1, name: 'Kibana' }, { id: 2, name: 'Grafana' }];
  render(<BaseMultipleAutocomplete
    label="Integrations"
    value={[]}
    options={options}
    getOptionLabel={(option) => option.name}
    onChange={onChange}
    isOptionEqualToValue={(option, selected) => option.id === selected.id}
  />);

  await user.click(screen.getByRole('combobox', { name: 'Integrations' }));
  await user.click(await screen.findByRole('option', { name: 'Kibana' }));

  expect(onChange).toHaveBeenCalledWith([options[0]]);
});

it('uses the custom option renderer and removes a selected option', async () => {
  const user = userEvent.setup();
  const options = [{ id: 1, name: 'Kibana' }, { id: 2, name: 'Grafana' }];
  const onChange = vi.fn();
  const renderOption = vi.fn((props: HTMLAttributes<HTMLLIElement>, option: { id: number; name: string }, selected: boolean) => {
    const { key, ...rest } = props as typeof props & { key: string };
    return <li key={key} {...rest}>{option.name} {selected ? 'selected' : 'available'}</li>;
  });
  render(<BaseMultipleAutocomplete label="Integrations" value={[options[0]]} options={options}
    getOptionLabel={(option) => option.name} onChange={onChange} renderOption={renderOption}
    isOptionEqualToValue={(option, selected) => option.id === selected.id} />);
  await user.click(screen.getByRole('combobox', { name: 'Integrations' }));
  expect(screen.getByRole('option', { name: 'Kibana selected' })).toBeInTheDocument();
  await user.click(screen.getByRole('option', { name: 'Kibana selected' }));
  expect(onChange).toHaveBeenCalledWith([]);
  expect(renderOption).toHaveBeenCalled();
});
