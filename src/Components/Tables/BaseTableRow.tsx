import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { FC, ReactNode } from 'react';

export type Cell = {
  value: ReactNode;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  rowSpan?: number;
};

type BaseTableRowProps = {
  cells: Cell[];
  hover?: boolean;
};

export const BaseTableRow: FC<BaseTableRowProps> = ({ cells, hover }) => {
  return (
    <TableRow hover={hover}>
      {cells.map((cell, index) => (
        <TableCell key={index} align={cell.align || 'left'} rowSpan={cell.rowSpan}>
          {cell.value}
        </TableCell>
      ))}
    </TableRow>
  );
};
