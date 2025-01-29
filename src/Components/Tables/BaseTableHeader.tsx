import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import * as React from 'react';
import { FC } from 'react';
import { TableRowCell } from './BaseTableRow';
import { OrderDirection } from '../../Services/Tables/Sorting';
import { SxProps, TableSortLabel, Theme } from '@mui/material';

export type TableHeaderCell = {
  orderKey?: string;
} & TableRowCell;

type BaseTableHeaderProps = {
  cells: TableHeaderCell[];
  rowSx?: SxProps<Theme>;
  orderBy?: string | null;
  setOrderBy?: (orderBy: string | null) => void;
  orderDirection?: OrderDirection;
  setOrderDirection?: (direction: OrderDirection) => void;
};

export type SortingTableHeaderProps = Pick<
  BaseTableHeaderProps,
  Required<'orderBy' | 'setOrderBy' | 'orderDirection' | 'setOrderDirection'>
>;

export const BaseTableHeader: FC<BaseTableHeaderProps> = (props) => {
  const { cells, rowSx, orderBy, setOrderBy, orderDirection, setOrderDirection } = props;

  const onOrder = (key: string | null) => () => {
    if (setOrderBy) {
      setOrderBy(key);
    }

    if (setOrderDirection) {
      setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
    }
  };

  return (
    <TableHead>
      <TableRow sx={rowSx}>
        {cells.map((cell, index) =>
          cell.hidden ? null : (
            <TableCell key={index} align={cell.align || 'left'} sx={{ whiteSpace: 'nowrap', pt: 2, pb: 2, ...cell.sx }}>
              {cell.orderKey ? (
                <TableSortLabel
                  active={orderBy === cell.orderKey}
                  direction={orderDirection}
                  onClick={onOrder(cell.orderKey)}>
                  {cell.value}
                </TableSortLabel>
              ) : (
                cell.value
              )}
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
};
