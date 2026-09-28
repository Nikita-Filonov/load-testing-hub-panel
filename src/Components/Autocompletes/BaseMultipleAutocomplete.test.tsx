import { expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BaseMultipleAutocomplete } from './BaseMultipleAutocomplete';

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
