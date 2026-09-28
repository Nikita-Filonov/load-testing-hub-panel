import { expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Table } from '@mui/material';
import { BaseTableHeader } from './BaseTableHeader';

it('shows visible columns and sends the next sorting direction for a sortable column', () => {
  const setOrderBy = vi.fn();
  const setOrderDirection = vi.fn();
  const cells = [
    { value: 'Method', orderKey: 'method' },
    { value: 'Requests', orderKey: 'requests', align: 'right' as const },
    { value: 'Hidden', hidden: true },
    { value: 'Notes' }
  ];
  const { rerender } = render(
    <Table>
      <BaseTableHeader cells={cells} orderBy="method" setOrderBy={setOrderBy}
        orderDirection="asc" setOrderDirection={setOrderDirection} />
    </Table>
  );
  expect(screen.getAllByRole('columnheader')).toHaveLength(3);
  expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  fireEvent.click(screen.getByText('Requests'));
  expect(setOrderBy).toHaveBeenCalledWith('requests');
  expect(setOrderDirection).toHaveBeenCalledWith('desc');

  rerender(
    <Table>
      <BaseTableHeader cells={cells} orderBy="requests" setOrderBy={setOrderBy}
        orderDirection="desc" setOrderDirection={setOrderDirection} />
    </Table>
  );
  fireEvent.click(screen.getByText('Method'));
  expect(setOrderBy).toHaveBeenLastCalledWith('method');
  expect(setOrderDirection).toHaveBeenLastCalledWith('asc');
});
